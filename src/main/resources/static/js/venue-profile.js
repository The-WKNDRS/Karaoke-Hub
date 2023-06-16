import {searchVenue} from "./yelp-api";

const getVenues = async () => {
    let venues = await searchVenue('7 sky bar', 78209);
    let yelpDiv = document.querySelector('.yelp');
    let el = document.createElement('div');
    venues.forEach(venue => {
        el.innerHTML = `<h2>Alias: ${venue.alias}</h2>
                        <h2>Rating: ${venue.rating}</h2>
                        <img src=${venue.image_url} alt="logo">`
    })
    yelpDiv.appendChild(el);

}

await getVenues();



