mapboxgl.accessToken = mapKey;
let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [-98.495141, 29.4246],
    zoom: 10
});
