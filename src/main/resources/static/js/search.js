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



