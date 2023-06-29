// uses fetched yelp data to display it on the page
const getVenues = async (query, location) => {
    let venues = await searchVenue(query, location);
    if(!venues || venues.length === 0){
        console.log("No venues returned");
        return;
    }
    let venue = venues[0];
    let business = await getBusinessData(venue.alias);
    console.log(business);
    let yelpRating = document.querySelector('.rating');
    let yelpImg = document.querySelector('.img-wrapper');
    let yelpCat = document.querySelector('.categories');
    let yelpPhone = document.querySelector('.phone');
    let yelpHours = document.querySelector('.hours');
    let el = document.createElement('div');
    yelpPhone.innerText = business.display_phone;
    if (business.hours && business.hours.length > 0 && business.hours[0].open) {
        let days = business.hours[0].open;
        days.forEach(day => {
            if (day.start && day.end) {
                yelpHours.innerHTML += `<p>${day.start} - ${day.end}</p>`;
            } else {
                console.log('Day data incomplete:', day);
            }
        });
    } else {
        console.log("Hours not available for this business");
    }
    if (venue.image_url === "") {
        yelpImg.innerHTML = `<img class="yelp-img" src="/img/generic-karaoke.jpeg" alt="logo">`
    } else {
        business.photos.forEach(photo => {
            yelpImg.innerHTML += `<img class="yelp-img" src=${photo} alt="logo">`
        })
    }
    for(let i = 1; i <= business.rating; i++) {
        yelpRating.innerHTML += `<img class="star" src="/img/star.png" alt="star">`
    }
    yelpRating.innerHTML += `<p>   - ${business.review_count} reviews  -  ${business.price}</p>`
    venue.categories.forEach(cat => {
        yelpCat.innerHTML += `<li>${cat.title}</li>`
    })
    if (business.is_closed === false) {
        yelpRating.innerHTML += "<h4 class='open' style='color: green'> - Open</h4>"
    } else {
        yelpRating.innerHTML += "<h4 style='color: red'> - Closed</h4>"
    }

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
        throw error; // or return [];
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

let createEventBtn = document.querySelector('.create-event');
let createEventModal = document.querySelector('.create-event-modal')
let submitEventBtn = document.querySelector('.submit-edit');

submitEditBtn.onclick = () => {
    editModal.style.display = "none";
}

editBtn.onclick = () => {
    editModal.style.display = 'flex';
}

window.onclick = (e) => {
    console.log(e.target)
    if (e.target == editModal) {
        editModal.style.display = "none";
    }else if (e.target == createEventModal) {
        createEventModal.style.display = "none";
    }
}

submitEventBtn.onclick = () => {
    createEventModal.style.display = "none";

}

createEventBtn.onclick = () => {
    createEventModal.style.display = 'flex';
}


( async () => {
    let yelpName = document.querySelector('.venueName');
    let yelpZip = document.querySelector('.venueZip');
    let yelpVal = yelpName.value;
    let yelpZipVal = yelpZip.value;
    await getVenues(yelpVal, yelpZipVal);
})()

// shows all comments and rotates arrow on button
let seeAllBtn = document.querySelector('.see-all');
let reviewWrapper = document.querySelector('.reviews-wrapper')
let commentArrow = document.querySelector('.comment-arrow');
seeAllBtn.onclick = () => {
    reviewWrapper.classList.toggle('show')
    reviewWrapper.classList.toggle('reviews-wrapper')
    commentArrow.classList.toggle('show-less')
    commentArrow.classList.toggle('comment-arrow')
}





