import * as mapboxUtils from "./mapbox-utils.js";

(async () => {

    const zipcodeForm = document.querySelector('#zipcodeForm');
    const zipcodeInput = document.querySelector('#zipcode');

    let zipValue = "";
    let geoVenues = await mapboxUtils.formatVenues(zipValue);

    mapboxgl.accessToken = mapKey;

    let map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-98.495141, 29.4246],
        zoom: 10
    });

    map.on('load', async () => {
        const geocoder = new MapboxGeocoder({
            // Initialize the geocoder
            accessToken: mapboxgl.accessToken, // Set the access token
            mapboxgl: mapboxgl, // Set the mapbox-gl instance
            zoom: 13, // Set the zoom level for geocoding results
            placeholder: 'Enter zipcode', // This placeholder text will display in the search bar
            limit: 10
        });
        map.addControl(geocoder, 'top-left'); // Add the search box to the top left
        map.addSource('places', {
            type: 'geojson',
            data: geoVenues
        });
        await mapboxUtils.buildLocationList(map, geoVenues);
        await mapboxUtils.addMarkers(map, geoVenues);
    });

    zipcodeForm.addEventListener('submit',  async function (event) {
        zipValue = zipcodeInput.value;
        event.preventDefault();
        geoVenues = await mapboxUtils.formatVenues(zipValue);
        map.getSource('places').setData(geoVenues);
        mapboxUtils.clearLocationList();
        await mapboxUtils.buildLocationList(map, geoVenues);
        mapboxUtils.clearMarkers();
        await mapboxUtils.addMarkers(map, geoVenues);
    });
})();


