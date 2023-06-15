import {getVenues, formatVenues, addMarkers, buildLocationList} from "/js/mapbox-utils.js";

(async () => {

    const geoVenues = await formatVenues();
    console.log(geoVenues)
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
        map.addSource('nearest-hospital', {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: []
            }
        });
        await buildLocationList(geoVenues);
        await addMarkers(map);


    });


})();


