import * as mapboxUtils from "./mapbox-utils.js";

(async () => {

    const zipcodeForm = document.querySelector('#zipcodeForm');
    const zipcodeInput = document.querySelector('#zipcode');
    let weekDay = document.querySelector('#weekday').value;

    let zipValue = "";
    let geoVenues = await mapboxUtils.formatVenues(zipValue, weekDay);

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
        weekDay = document.querySelector('#weekday').value;
        zipValue = "";
        if (zipcodeInput.value != null) {
            zipValue = zipcodeInput.value;
        }
        event.preventDefault();
        geoVenues = await mapboxUtils.formatVenues(zipValue, weekDay);
        map.getSource('places').setData(geoVenues);
        //Geocode the zipcode
        let newCenter = [-98.495141, 29.4246];
        if (zipValue !== '') {
            newCenter = await geocode(zipValue, mapboxgl.accessToken);
            map.flyTo({
                center: newCenter,
                zoom: 11
            });
        } else {
            map.flyTo({
                center: newCenter,
                zoom: 10
            });
        };
        mapboxUtils.clearLocationList();
        await mapboxUtils.buildLocationList(map, geoVenues);
        mapboxUtils.clearMarkers();
        await mapboxUtils.addMarkers(map, geoVenues);
    });
})();


