// uses fetched yelp data to display it on the page
const getVenues = async (query, location) => {
    let venues = await searchVenue(query, location);
    let venue = venues[0];
    let business = await getBusinessData(venue.alias);
    console.log(business);
    let yelpRating = document.querySelector('.rating');
    let yelpImg = document.querySelector('.img-wrapper');
    let yelpCat = document.querySelector('.categories');
    let el = document.createElement('div');
    if (venue.image_url !== "") {
        yelpImg.innerHTML = `<img class="yelp-img" src=${venue.image_url} alt="logo">`
    } else {
        yelpImg.innerHTML = `<img class="yelp-img" src="/img/generic-karaoke.jpeg" alt="logo">`
    }
    for(let i = 1; i <= venue.rating; i++) {
        yelpRating.innerHTML += `<img class="star" src="/img/star.png" alt="star">`
    }
    yelpRating.innerHTML += `<p>   - ${venue.review_count} reviews</p>`
    venue.categories.forEach(cat => {
        yelpCat.innerHTML += `<li>${cat.title}</li>`
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

async function getBusinessData(business_id) {
    try {
        let url = `${window.location.protocol}//${window.location.host}/yelpBusiness/${business_id}`;
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
let submitEditBtn = document.querySelector('.submit-edit');

submitEditBtn.onclick = () => {
    editModal.style.display = "none";
}

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




