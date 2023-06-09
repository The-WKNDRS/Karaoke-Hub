import * as utils from './utils.js';

const listings = document.getElementById('listings');
let newCenter = [0, 0];

export const getVenues = async function (zipValue, weekDay) {
    try {
        let url = '/search-venue-json';
        if (weekDay !== 'Any') {
            if (zipValue !== '') {
                url += `?zipcode=${zipValue}`;
            } else {
                url += '?zipcode=null';
            }
            url += `&weekday=${weekDay}`;
        } else {
            if (zipValue !== '') {
                url += `?zipcode=${zipValue}`;
            } else {
                url += '?zipcode=null';
            }
            url += `&weekday=Any`;
        }
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.log(error);
    }
};

export const formatVenues = async function (zipValue, weekDay) {
    try {
        const geoVenues = {
            "type": "FeatureCollection",
            "features": []
        }
        // Fetch the Mapbox API key from the server
        const mapboxApiKeyUrl = '/api/get-mapbox-api-key';
        const response = await fetch(mapboxApiKeyUrl);
        const mapKey = await response.text();

        for (const venue of await getVenues(zipValue, weekDay)) {
            let formattedVenues = {
                type: "Feature",
                geometry: {type: "Point", coordinates: []},
                properties: {
                    id: venue.id,
                    name: venue.name,
                    address: venue.address,
                    city: venue.city,
                    state: venue.state,
                    zip: venue.zipcode,
                    events: venue.events
                }
            };
            if (venue.website) {
                formattedVenues.properties.website = venue.website;
            } else {
                formattedVenues.properties.website = "N/A";
            }
            if (venue.yelp_id) {
                formattedVenues.properties.yelp_id = venue.yelp_id;
            } else {
                formattedVenues.properties.yelp_id = "N/A";
            }
            let addressString = (formattedVenues.properties.address + "," + formattedVenues.properties.city + "," + formattedVenues.properties.state + "," + formattedVenues.properties.zip);

            let coords = await geocode((addressString), mapKey).then(async function (result) { return result; });
            formattedVenues.geometry.coordinates = (coords);
            geoVenues.features.push(formattedVenues);
        }
        return geoVenues;
    } catch (error) {
        console.log(error);
    }
};

export function addMarkers(map, geoVenues, center) {
    clearMarkers();
    /* For each feature in the GeoJSON object above: */
    for (const marker of geoVenues.features) {
        /* Create a div element for the marker. */
        const el = document.createElement('div');
        /* Assign a unique `id` to the marker. */
        el.id = `marker-${marker.properties.id}`;
        /* Assign the `marker` class to each marker for styling. */
        el.className = 'marker';
        new mapboxgl.Marker(el, { offset: [0, -23] })
            .setLngLat(marker.geometry.coordinates)
            .addTo(map);
        el.addEventListener('click', (e) => {
            /* Fly to the point */
            flyToVenue(map, marker);
            /* Close all other popups and display popup for clicked store */
            createPopUp(map, marker, center);
            /* Highlight listing in sidebar */
            const activeItem = document.getElementsByClassName('active');
            e.stopPropagation();
            if (activeItem[0]) {
                activeItem[0].classList.remove('active');
            }
            const listing = document.getElementById(`listing-${marker.properties.id}`);
            listing.classList.add('active');
        });
    }
}

export function buildLocationList(map, geoVenues, center) {
    try {
        // Clear the listings
        listings.innerHTML = '';
        // Clear and add markers
        addMarkers(map, geoVenues, center);
        //Display the venues in the sidebar
        for (const venue of geoVenues.features) {
            /* Add a new listing section to the sidebar. */
            const listing = listings.appendChild(document.createElement('div'));
            /* Assign a unique `id` to the listing. */
            listing.id = `listing-${venue.properties.id}`;
            /* Assign the `item` class to each listing for styling. */
            listing.className = 'item appear';


            /* Add the link to the individual listing created above. */
            const link = document.createElement('a');
            const linkTitle = document.createElement('h2');
            linkTitle.appendChild(link);
            listing.appendChild(linkTitle);
            link.href = '#';
            link.className = 'title';
            link.id = `link-${venue.properties.id}`;
            link.innerHTML = `${venue.properties.name}`;
            // fly to point and pop up
            link.addEventListener('click', function () {
                for (const feature of geoVenues.features) {
                    if (this.id === `link-${feature.properties.id}`) {
                        flyToVenue(map, feature);
                        createPopUp(map, feature)
                    }
                }
                const activeItem = document.getElementsByClassName('active');
                if (activeItem[0]) {
                    activeItem[0].classList.remove('active');
                }
                this.parentNode.classList.add('active');
            });

            // marker color change
            link.addEventListener('mouseenter', function () {
                for (const feature of geoVenues.features) {
                    if (this.id === `link-${feature.properties.id}`) {
                        changeMarkerColor(feature);
                    }
                }
            });

            link.addEventListener('mouseleave', function () {
                for (const feature of geoVenues.features) {
                    if (this.id === `link-${feature.properties.id}`) {
                        changeMarkerColor(feature);
                    }
                }
            });

            /* Add details to the individual listing. */
            const details = listing.appendChild(document.createElement('div'));
            const detailsTitle = document.createElement('h3');
            detailsTitle.innerHTML = 'Events';
            details.appendChild(detailsTitle);
            if (venue.properties.events) {
                venue.properties.events.forEach((event) => {
                    let el = document.createElement('h4');
                    el.innerHTML = `${event.day_of_week} Start: ${event.start_time} End: ${event.end_time}`;
                    details.appendChild(el);
                });
            }
        }
        const appear = document.querySelectorAll('.appear');
        const cb = function(entries){
            entries.forEach(entry => {
                if(entry.isIntersecting){
                    entry.target.classList.add('inview');
                } else {
                    entry.target.classList.remove('inview');
                }
            });
        }
        const io = new IntersectionObserver(cb);
        appear.forEach(el => io.observe(el));
    } catch (error) {
        console.log(error);
    }
    //if no venues are found
    if (listings.innerHTML === '') {
        noVenues();
    }
}

export function noVenues() {
    const noVenues = listings.appendChild(document.createElement('div'));
    noVenues.className = 'item';

    /* Add the message */
    const noDetailsTitle = document.createElement('h3');
    noDetailsTitle.innerHTML = 'No venues found. Please try again.';
    noVenues.appendChild(noDetailsTitle);
}

function clearMarkers() {
    let markers = document.getElementsByClassName('marker');
    while(markers.length > 0) {
        markers[0].remove();
    }
}

function flyToVenue(map, currentFeature) {
    map.flyTo({
        center: currentFeature.geometry.coordinates,
        zoom: 15
    });
}

//set map to use initial data
export async function resetMap(map, center, geoVenues) {
    map.getSource('venues').setData(geoVenues);
    await buildLocationList(map, geoVenues, center);
    map.flyTo({
        center: center,
        zoom: 10
    });
}

function createPopUp(map, currentFeature, center) {
    const popUps = document.getElementsByClassName('mapboxgl-popup');
    /** Check if there is already a popup on the map and if so, remove it */
    if (popUps[0]) popUps[0].remove();

    const popup = new mapboxgl.Popup({ closeOnClick: true })
        .setLngLat(currentFeature.geometry.coordinates)
        .setHTML(`<h3>${currentFeature.properties.name}</h3><h4>${currentFeature.properties.address}</h4><h5><a href="/venue/${currentFeature.properties.id}" class="popup-link">Go to venue page</a></h5>`)
        .addTo(map);

    popup.on('close', function() {
        map.flyTo({
            center: center,
            zoom: 10
        });
    });
}

function changeMarkerColor(currentFeature) {
    let markers = document.getElementsByClassName('marker');
    for (const marker of markers) {
        if (`marker-${currentFeature.properties.id}` === marker.id) {
            marker.classList.toggle('change');
        }
    }
}

export async function searchVenues(map, zipcodeInput, weekDay) {
    try {
        let zipValue = "";

        if (zipcodeInput.value != null) {
            zipValue = zipcodeInput.value;
        }

        //Get the venues
        let geoVenues = await formatVenues(zipValue, weekDay);
        map.getSource('venues').setData(geoVenues);

        //Geocode the zipcode
        if (zipValue !== '') {
            //check if the zip code only contains numbers or -
            if (utils.containsOnlyNumbers(zipValue) === false) {
                alert('Please enter a valid zip code');
                return;
            }

            //check if the zip code is 5 digits
            if (zipValue.length < 5) {
                newCenter = geoVenues.features[utils.randomNumber(0, geoVenues.features.length-1)].geometry.coordinates;
            } else {
                newCenter = await geocode(zipValue, mapboxgl.accessToken);
            }

            map.flyTo({
                center: newCenter,
                zoom: 10
            });
        } else {
            if (geoVenues.features.length === 0) {
                noVenues();
                return;
            } else {
                newCenter = geoVenues.features[utils.randomNumber(0, geoVenues.features.length - 1)].geometry.coordinates;
                map.flyTo({
                    center: newCenter,
                    zoom: 10
                });
            }
        }
        return geoVenues;
    } catch (error) {
        console.log(error);
    }
}


