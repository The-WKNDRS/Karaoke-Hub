// uses fetched yelp data to display it on the page
const getVenues = async (query, location) => {
    let venues = await searchVenue(query, location);
    let yelpRating = document.querySelector('.rating');
    let yelpImg = document.querySelector('.img-wrapper');
    let yelpCat = document.querySelector('.categories');
    let el = document.createElement('div');
    let venue = venues[0];
    yelpImg.innerHTML = `<img class="yelp-img" src=${venue.image_url} alt="logo">`
    yelpRating.innerHTML = `<h2>Rating: ${venue.rating}/5</h2>`
    venue.categories.forEach(cat => {
        yelpCat.innerHTML += `<li>${cat.alias}</li>`
    })
}
// function to fetch yelp data through spring
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

let editBtn = document.querySelector('.edit');
let editModal = document.querySelector('.edit-modal')

editBtn.onclick = () => {
    editModal.style.display = 'flex';
}

window.onclick = (e) => {
    if (e.target == editModal) {
        editModal.style.display = "none";
    }
}

( async () => {
    let yelpName = document.querySelector('.venueName');
    let yelpZip = document.querySelector('.venueZip');
    let yelpVal = yelpName.value;
    let yelpZipVal = yelpZip.value;
    await getVenues(yelpVal, yelpZipVal);
})()




