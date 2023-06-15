

export const getVenues = async function () {
    try {
        const response = await fetch('/search-venue-json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
};

const geoVenues = {
    "type": "FeatureCollection",
    "features": [
    ]
};

let database= await getVenues();

export const formatVenues = async function () {
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
                zip: venue.zip,
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

        let coords = await geocode((addressString), mapKey).then(async function(result) {return result;});
        formattedVenues.geometry.coordinates = (coords);
        geoVenues.features.push(formattedVenues);
    }
    return geoVenues;
};

const coords = {}

export function addMarkers(map) {
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
            flyToStore(marker);
            /* Close all other popups and display popup for clicked store */
            createPopUp(marker);
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

export function buildLocationList(geoVenues) {
    for (const venue of geoVenues.features) {
        console.log(venue);
        /* Add a new listing section to the sidebar. */
        const listings = document.getElementById('listings');
        const listing = listings.appendChild(document.createElement('div'));
        /* Assign a unique `id` to the listing. */
        listing.id = `listing-${venue.properties.id}`;
        /* Assign the `item` class to each listing for styling. */
        listing.className = 'item';

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
                    flyToStore(feature);
                    createPopUp(feature)
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
                    console.log(this.id);
                    changeMarker(feature);
                }
            }
        });

        link.addEventListener('mouseleave', function () {
            for (const feature of geoVenues.features) {
                if (this.id === `link-${feature.properties.id}`) {
                    console.log(this.id);
                    changeMarker(feature);
                }
            }
        });

        /* Add details to the individual listing. */
        const details = listing.appendChild(document.createElement('div'));
        const detailsTitle = document.createElement('h3');
        detailsTitle.innerHTML = 'Events';
        details.appendChild(detailsTitle);
        venue.properties.events.forEach((event, index) => {
            let el = document.createElement('h4');
            el.innerHTML = `${event.day_of_week} Start: ${event.start_time} End: ${event.end_time}`;
            details.appendChild(el);
        })
        if (venue.properties.phone) {
            details.innerHTML += ` · ${venue.properties.phoneFormatted}`;
        }
        if (venue.properties.distance) {
            const roundedDistance = Math.round(venue.properties.distance * 100) / 100;
            details.innerHTML += `<div><strong>${roundedDistance} miles away</strong></div>`;
        }
    }
}

function flyToStore (currentFeature) {
    map.flyTo({
        center: currentFeature.geometry.coordinates,
        zoom: 15
    });
}

function createPopUp(currentFeature) {
    const popUps = document.getElementsByClassName('mapboxgl-popup');
    /** Check if there is already a popup on the map and if so, remove it */
    if (popUps[0]) popUps[0].remove();

    const popup = new mapboxgl.Popup({ closeOnClick: false })
        .setLngLat(currentFeature.geometry.coordinates)
        .setHTML(`<h3>${currentFeature.properties.name}</h3><h4>${currentFeature.properties.address}</h4><h5><a href="/venue-profile/${currentFeature.properties.id}">Go to venue page</a></h5>`)
        .addTo(map);
    console.log(currentFeature.properties.id);
}

function changeMarker(currentFeature) {
    let markers = document.getElementsByClassName('marker');
    console.log(markers);
    for (const marker of markers) {
        console.log(marker.id)
        console.log(currentFeature.properties.id);
        if (`marker-${currentFeature.properties.id}` === marker.id) {
            marker.classList.toggle('change-color');
        }
    }
}
