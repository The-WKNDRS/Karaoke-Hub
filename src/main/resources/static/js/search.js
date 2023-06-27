import * as mapboxUtils from "./mapbox-utils.js";
import {searchVenue, getBusinessData} from "./yelp-utils.js";

// Fetch the Mapbox API key from the server
fetch('/api/get-mapbox-api-key')
    .then(response => response.text())
    .then(mapKey => {
        // Use the retrieved Mapbox API key in your JavaScript code
        mapboxgl.accessToken = mapKey;

        (async () => {
            const zipcodeForm = document.querySelector('#zipcodeForm');
            const zipcodeInput = document.querySelector('#zipcode');
            const weekdayInput = document.querySelector('#weekday');
            let weekDay = document.querySelector('#weekday').value;
            let zipValue = "";
            let geoVenues = await mapboxUtils.formatVenues(zipValue, weekDay);
            let center = [0, 0];

            let map = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/mapbox/streets-v12',
                center: center,
                zoom: 1
            });

            map.on('load', async () => {
                map.addSource('places', {
                    type: 'geojson',
                    data: geoVenues
                });
                await mapboxUtils.buildLocationList(map, geoVenues);
                await mapboxUtils.addMarkers(map, geoVenues);
                getLocation();
            });

            zipcodeForm.addEventListener('change', async function (event) {
                await mapboxUtils.searchVenues(event, map, geoVenues, zipcodeInput, weekDay, zipValue);
            });

            weekdayInput.addEventListener('change', async function (event) {
                await mapboxUtils.searchVenues(event, map, geoVenues, zipcodeInput, weekDay, zipValue);
            });

            //GeoLocation Functions
            function getLocation() {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(showPosition);
                    return navigator.geolocation.getCurrentPosition(showPosition);
                } else {
                    alert("Geolocation is not supported by this browser.");
                }
            }

            function showPosition(position) {
                center = [position.coords.longitude, position.coords.latitude];
                map.flyTo({
                    center: center,
                    zoom: 10
                });
            }
        })();
    })
    .catch(error => {
        console.error('Error:', error);
        // Handle the error condition
    });

// Make the listings draggable:
    if (window.innerWidth < 768) {
        dragElement(document.querySelector(".drag"));
        let sideBar = document.querySelector(".sidebar");
        let zipForm = document.querySelector("#zipcodeForm");
        function dragElement(elmnt) {
            let pos1 = 0, pos2 = 0;

            document.querySelector(".drag").onmousedown = dragMouseDown;

            function dragMouseDown(e) {
                e = e || window.event;
                e.preventDefault();
                // get the mouse cursor position at startup:
                pos2 = e.clientY;
                document.onmouseup = closeDragElement;
                // call a function whenever the cursor moves:
                document.onmousemove = elementDrag;
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

            function closeDragElement() {
                // stop moving when mouse button is released:
                document.onmouseup = null;
                document.onmousemove = null;

                //snap to position based on current position
                if (elmnt.offsetTop <= (window.innerHeight * .3)) {
                    elmnt.style.top = "4%";
                    sideBar.style.top = "4%";
                    zipForm.style.top = "4%";
                } else if (elmnt.offsetTop > (window.innerHeight * .3) && elmnt.offsetTop < (window.innerHeight * .65)) {
                    elmnt.style.top = "65%";
                    sideBar.style.top = "65%";
                    zipForm.style.top = "65%";
                } else {
                    elmnt.style.top = ((((window.innerHeight - document.querySelector("footer").offsetHeight) - sideBar.children[0].offsetHeight) - document.querySelector(".navbar").offsetHeight) + 2) + "px";
                    sideBar.style.top = ((((window.innerHeight - document.querySelector("footer").offsetHeight) - sideBar.children[0].offsetHeight) - document.querySelector(".navbar").offsetHeight) + 2) + "px";
                    zipForm.style.top = ((((window.innerHeight - document.querySelector("footer").offsetHeight) - sideBar.children[0].offsetHeight) - document.querySelector(".navbar").offsetHeight) + 2) + "px";
                }

            }
        }
    }


