import * as mapboxUtils from "./mapbox-utils.js";
import * as utils from "./utils.js";

(async () => {
    // Fetch the Mapbox API key from the server
    fetch('/api/get-mapbox-api-key')
        .then(response => response.text())
        .then(mapKey => {
            // Use the retrieved Mapbox API key in your JavaScript code
            mapboxgl.accessToken = mapKey;
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle the error condition
        });

    const clearButton = document.querySelector('#clear');
    // const zipcodeForm = document.querySelector('#zipcodeForm');
    const zipcodeInput = document.querySelector('#zipcode');
    const weekdayInput = document.querySelector('#weekday');
    const searchToggle = document.querySelector('#mic-checkbox');
    const zipWrapper = document.querySelector('.zipcode-wrapper');
    const distanceWrapper = document.querySelector('.distance');
    let drag = document.querySelector(".drag");
    let sideBar = document.querySelector(".sidebar");
    let zipForm = document.querySelector("#zipcodeForm");
    let distance = document.querySelector('#distance');
    let weekDay = weekdayInput.value;
    let zipValue = "";
    const geoVenues = await mapboxUtils.formatVenues(zipValue, weekDay);
    let center = [0, 0];
    let map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/navigation-night-v1',
        center: center,
        zoom: 1
    });
    let data;

    map.on('load', async () => {
        map.addSource('venues', {
            type: 'geojson',
            data: geoVenues
        });
        await mapboxUtils.buildLocationList(map, geoVenues, center);
        getLocation(showPosition);
    });

    //GeoLocation Functions
    function getLocation(searchFunction) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(searchFunction);
            return navigator.geolocation.getCurrentPosition(searchFunction);
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }

    function showPosition(position) {
        currentLocationMarker(position);
    }

    async function distanceFromPosition(position) {
        currentLocationMarker(position);
        if (distance.value === "") {
            await mapboxUtils.resetMap(map, center, geoVenues);
        } else {
            let filteredVenues = {
                "type": "FeatureCollection",
                "features": []
            }
            if (data === undefined) {
                filteredVenues.features = geoVenues.features.filter(function (venue) {
                    return turf.distance(turf.point(venue.geometry.coordinates), turf.point(center)) <= distance.value;
                });
            } else if (data.features.length > 0 && data.features.length <= geoVenues.features.length) {
                filteredVenues.features = data.features.filter(function (venue) {
                    return turf.distance(turf.point(venue.geometry.coordinates), turf.point(center)) <= distance.value;
                });
            }
            map.getSource('venues').setData(filteredVenues);
            await mapboxUtils.buildLocationList(map, filteredVenues, center);
        }
    }

    // Make the listings draggable:
    dragElement(drag);

    function dragElement(elmnt) {
        let pos1 = 0, pos2 = 0;

        elmnt.addEventListener("mousedown", dragMouseDown);
        elmnt.addEventListener("touchstart", dragMouseDown);
        elmnt.addEventListener("touchmove", elementDrag);
        elmnt.addEventListener("touchend", snapDragElement);

        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            // get the mouse cursor position at startup:
            pos2 = e.clientY;
            document.onmouseup = snapDragElement;
            document.ontouchend = snapDragElement;
            // call a function whenever the cursor moves:
            document.onmousemove = elementDrag;
            document.ontouchmove = elementDrag;
        }

        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            // calculate the new cursor position:
            pos1 = pos2 - e.clientY;
            pos2 = e.clientY;
            // set the element's new position:
            elmnt.style.top = (elmnt.offsetTop - pos1) + "px";
            sideBar.style.top = (elmnt.offsetTop - pos1) + "px";
            zipForm.style.top = (elmnt.offsetTop - pos1) + "px";
        }

        function snapDragElement() {
            // stop moving when mouse button is released:
            document.onmouseup = null;
            document.onmousemove = null;
            document.ontouchend = null;
            document.ontouchmove = null;

            //snap to position based on current position
            if (elmnt.offsetTop <= (window.innerHeight * .3)) {
                elmnt.style.top = "14%";
                sideBar.style.top = "14%";
                zipForm.style.top = "14%";
            } else if (elmnt.offsetTop > (window.innerHeight * .3) && elmnt.offsetTop < (window.innerHeight * .65)) {
                elmnt.style.top = "65%";
                sideBar.style.top = "65%";
                zipForm.style.top = "65%";
            } else {
                closeSideBar();
            }

        }
    }

    //close sidebar
    function closeSideBar() {
        drag.style.top = ((((window.innerHeight - document.querySelector("footer").offsetHeight) - sideBar.children[0].offsetHeight) - document.querySelector(".navbar").offsetHeight) + 80) + "px";
        sideBar.style.top = ((((window.innerHeight - document.querySelector("footer").offsetHeight) - sideBar.children[0].offsetHeight) - document.querySelector(".navbar").offsetHeight) + 80) + "px";
        zipForm.style.top = ((((window.innerHeight - document.querySelector("footer").offsetHeight) - sideBar.children[0].offsetHeight) - document.querySelector(".navbar").offsetHeight) + 80) + "px";
    }

    //fetch filtered data
    async function filterData(map, zipcodeInput, weekDay) {
        if (clearButton.classList.contains('d-none')) {
            clearButton.classList.toggle('d-none');
        }
        data = await mapboxUtils.searchVenues(map, zipcodeInput, weekDay);
        mapboxUtils.buildLocationList(map, data, center);
    }

    //current location marker
    function currentLocationMarker(position) {
        center = [position.coords.longitude, position.coords.latitude];
        map.flyTo({
            center: center,
            zoom: 10
        });

        let marker = new mapboxgl.Marker();
        marker.setLngLat(center);
        marker.addTo(map);
        marker.setPopup(new mapboxgl.Popup().setHTML("<h3>You are here!</h3>"));
    }

    //search event listeners
    zipForm.addEventListener('submit', async function (event) {
        //if the form has all default values, don't submit
        if (zipcodeInput.value === "" && weekdayInput.value === "Any" && distance.value === "") {
            event.preventDefault();
            await mapboxUtils.resetMap(map, center, geoVenues);
        } else {
            await filterData(map, zipcodeInput, weekDay);
        }
    });

    zipcodeInput.addEventListener('change',async function (event) {
        await filterData(map, zipcodeInput, weekDay);
    });

    zipcodeInput.addEventListener('keyup', utils.debounce(async function (event) {
        await filterData(map, zipcodeInput, weekDay);
    }, 1900));

    weekdayInput.addEventListener('change', async function (event) {
        weekDay = weekdayInput.value;
        await filterData(map, zipcodeInput, weekDay);
        if (!searchToggle.checked) {
            console.log(data);
            getLocation(distanceFromPosition);
        }
    });

    distance.addEventListener('change', async function (event) {
        if (clearButton.classList.contains('d-none')) {
            clearButton.classList.toggle('d-none');
        }
        getLocation(distanceFromPosition);
    });

    //Event listener for zip/distance filter toggle
    searchToggle.addEventListener('click', async function (event) {
        if (searchToggle.checked) {
            if (!clearButton.classList.contains('d-none')) {
                clearButton.classList.toggle('d-none');
            }
            zipForm.reset();
            await mapboxUtils.resetMap(map, center, geoVenues);
            zipWrapper.classList.remove('d-none');
            distanceWrapper.classList.add('d-none');
            await mapboxUtils.buildLocationList(map, geoVenues, center);
        } else {
            if (!clearButton.classList.contains('d-none')) {
                clearButton.classList.toggle('d-none');
            }
            zipForm.reset();
            await mapboxUtils.resetMap(map, center, geoVenues);
            distanceWrapper.classList.remove('d-none');
            zipWrapper.classList.add('d-none');
            data = undefined;
            await mapboxUtils.buildLocationList(map, geoVenues, center);
        }
    });

    //Event listener for the "clear" button
    document.querySelector("#clear").addEventListener("click", async function () {
        //reset the form
        zipForm.reset();

        //reset the map
        await mapboxUtils.resetMap(map, center, geoVenues);

        //reset the search toggle
        searchToggle.checked = true;

        //remove the clear button
        clearButton.classList.toggle('d-none');
        if (zipWrapper.classList.contains('d-none')) {
            distanceWrapper.classList.add('d-none');
            zipWrapper.classList.remove('d-none');
        }

        //close the sidebar
        if (window.innerWidth < 768) {
            closeSideBar();
        }
    });

    //Reset the adjusted positions on window resize
    window.addEventListener('resize', function () {
        if (window.innerWidth > 768) {
            document.querySelector(".drag").style.top = "unset";
            sideBar.style.top = "65px";
            zipForm.style.top = "0";
        } else {
            document.querySelector(".drag").style.top = "65%";
            sideBar.style.top = "65%";
            zipForm.style.top = "65%";
        }

    });

})();






