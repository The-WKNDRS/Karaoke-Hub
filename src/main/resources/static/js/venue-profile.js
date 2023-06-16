
const getVenues = async (query, location) => {
    let venues = await searchVenue(query, location);
    let yelpRating = document.querySelector('.rating');
    let yelpImg = document.querySelector('.img-wrapper');
    let el = document.createElement('div');
    let venue = venues[0];
    yelpImg.innerHTML = `<img class="yelp-img" src=${venue.image_url} alt="logo">`
    yelpRating.innerHTML = `<h2>Rating: ${venue.rating}</h2>`
    el.innerHTML = `<h2>Alias: ${venue.alias}</h2>
                    <h2>Rating: ${venue.rating}</h2>`
    yelpDiv.appendChild(el);
}



async function searchVenue(query, zipcode) {
    try {
        let url = `${window.location.protocol}//${window.location.host}/yelp/${query}?location=${zipcode}`;
        let response = await fetch(url);
        let data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log('Error:', error);
    }
}
( async () => {
    let yelpName = document.querySelector('.venueName');
    let yelpZip = document.querySelector('.venueZip');
    let yelpVal = yelpName.value;
    let yelpZipVal = yelpZip.value;
    await getVenues(yelpVal, yelpZipVal);
})()




