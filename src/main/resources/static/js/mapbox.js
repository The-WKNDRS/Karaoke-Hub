(async () => {

    const geoVenues = {
        "type": "FeatureCollection",
        "features": [
        ]
    };

    let database= [];

    const getVenues = async function () {
        try {
            const response = await fetch('/search-venue-json');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
        }
    };

    database = await getVenues();

    const formatVenues = async function () {
        for (const venue of database) {
            let formattedVenues = {
                type: "Feature",
                geometry: {type: "Point", coordinates: []},
                properties: {
                    id: venue.id,
                    name: venue.name,
                    address: venue.address,
                    city: venue.city,
                    state: venue.state,
                    zip: venue.zip
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

            let coords = await geocode((addressString), mapKey).then(async function(result) {return result;});
            formattedVenues.geometry.coordinates = (coords);
            geoVenues.features.push(formattedVenues);
        }
    };

    await formatVenues();
    console.log(geoVenues);

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
        map.addControl(geocoder, 'top-left'); // Add the search box to the top left
        map.addLayer({
            id: 'locations',
            type: 'circle',
            /* Add a GeoJSON source containing place coordinates and information. */
            source: {
                type: 'geojson',
                data: geoVenues
            }
        });
    });

})();
