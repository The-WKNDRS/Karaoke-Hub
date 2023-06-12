// (async () => {
//
//     let searchInput = document.getElementById('search-input');
//     let searchButton = document.getElementById('search-button');
//
//     mapboxgl.accessToken = mapKey;
//     let map = new mapboxgl.Map({
//         container: 'map',
//         style: 'mapbox://styles/mapbox/streets-v12',
//         center: [-98.495141, 29.4246],
//         zoom: 10
//     });
//
//     const markers = []; // Create an array to store the markers
//
//     const marker = new mapboxgl.Marker({
//         draggable: true
//     }).setLngLat(coordinates)
//     .addTo(map);
//
//     markers.push(marker); // Add the marker to the array
//
// let addMarker = function (event) {
//         let coordinates = event.lngLat;
//         //Fly to the marker
//         map.flyTo({
//             center: coordinates,
//             zoom: 13,
//             speed: 0.8,
//             curve: 1,
//             easing: function (t) {
//                 return t;
//             }
//         });
//     };
//
// markers.forEach(marker => {
//     marker.on('dragend', dragMarker);
// });
//
//
//     map.on('click', addMarker.bind(map));
// //after dragging the marker, update the weather data
//     let dragMarker = function () {
//         let coordinates = marker.getLngLat();
//         // geocode the coordinates
//         //Fly to the marker
//         map.flyTo({
//             center: coordinates,
//             zoom: 13,
//             speed: 0.8,
//             curve: 1,
//             easing: function (t) {
//                 return t;
//             }
//         });
//     };
//     marker.on('dragend', dragMarker);
//
//
//     searchButton.addEventListener('click', async function(event) {
//         event.preventDefault();
//         console.log("button clicked");
//         let location = searchInput.value;
//         let coords = await geocode(searchInput.value , mapKey).then(async function(result) {
//             map.setCenter(result);
//             map.setZoom(15);
//             console.log(result);
//             return result;
//         });
//         const marker =new mapboxgl.Marker().setLngLat(coords).addTo(map);
//
//         markers.push(marker);
//     });
//
// })();

(async () => {

    let searchInput = document.getElementById('search-input');
    let searchButton = document.getElementById('search-button');

    mapboxgl.accessToken = mapKey;
    let map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-98.495141, 29.4246],
        zoom: 10
    });

    map.on('load', () => {
        const geocoder = new MapboxGeocoder({
            // Initialize the geocoder
            accessToken: mapboxgl.accessToken, // Set the access token
            mapboxgl: mapboxgl, // Set the mapbox-gl instance
            zoom: 13, // Set the zoom level for geocoding results
            placeholder: 'Enter an address or place name', // This placeholder text will display in the search bar
        });
        // Add the geocoder to the map
        map.addControl(geocoder, 'top-left'); // Add the search box to the top left
    });

    const markers = []; // Create an array to store the markers

    let addMarker = function (event) {
        let coordinates = event.lngLat;

        // Create a new marker and add it to the map
        const marker = new mapboxgl.Marker({
            draggable: true
        }).setLngLat(coordinates)
            .addTo(map);

        // Store the marker in the markers array
        markers.push(marker);

        // Fly to the marker
        map.flyTo({
            center: coordinates,
            zoom: 13,
            speed: 0.8,
            curve: 1,
            easing: function (t) {
                return t;
            }
        });
    };

    map.on('click', addMarker.bind(map));

    let dragMarker = function () {
        let coordinates = marker.getLngLat();

        // Fly to the marker
        map.flyTo({
            center: coordinates,
            zoom: 13,
            speed: 0.8,
            curve: 1,
            easing: function (t) {
                return t;
            }
        });
    };

    // Iterate over the markers array and add the dragend event listener to each marker
    markers.forEach(marker => {
        marker.on('dragend', dragMarker);
    });

    searchButton.addEventListener('click', async function(event) {
        event.preventDefault();
        console.log("button clicked");
        let location = searchInput.value;
        let coords = await geocode(searchInput.value, mapKey).then(async function(result) {
            map.setCenter(result);
            map.setZoom(15);
            console.log(result);
            return result;
        });

        // Create a new marker and add it to the map
        const marker = new mapboxgl.Marker().setLngLat(coords).addTo(map);

        // Store the marker in the markers array
        markers.push(marker);
    });

})();
