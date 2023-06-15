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
        //Geocode the zipcode
        let newCenter = await geocode(zipValue, mapboxgl.accessToken);
        console.log(newCenter)
        map.flyTo({
            center: newCenter,
            zoom: 11
        });
        mapboxUtils.clearLocationList();
        await mapboxUtils.buildLocationList(map, geoVenues);
        mapboxUtils.clearMarkers();
        await mapboxUtils.addMarkers(map, geoVenues);
    });
})();


