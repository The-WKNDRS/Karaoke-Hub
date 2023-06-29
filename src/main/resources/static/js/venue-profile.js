// uses fetched yelp data to display it on the page

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
        return data;
    } catch (error) {
        console.log('Error:', error);
    }
}
const getVenues = async (query, location) => {
    let venues = await searchVenue(query, location);
    console.log(venues)
    let venue = venues[0];
    let business = await getBusinessData(venue.alias);
    let yelpRating = document.querySelector('.rating');
    let yelpImg = document.querySelector('.img-wrapper');
    let yelpCat = document.querySelector('.categories');
    let yelpPhone = document.querySelector('.phone');
    let yelpHours = document.querySelector('.hours');
    let el = document.createElement('div');
    yelpPhone.innerText = business.display_phone;
    let days = business.hours[0].open;
    yelpHours.innerHTML += `<p>${days[0].start} - ${days[0].end}</p>
                           <p>${days[1].start} - ${days[1].end}</p>
                           <p>${days[2].start} - ${days[2].end}</p>
                           <p>${days[3].start} - ${days[3].end}</p>
                           <p>${days[4].start} - ${days[4].end}</p>
                           <p>${days[5].start} - ${days[5].end}</p>
                           <p>${days[6].start} - ${days[6].end}</p>`
    if (business.photos.length < 1) {
        yelpImg.innerHTML = `<img class="yelp-img" src="/img/generic-karaoke.jpeg" alt="logo">
                             <img class="yelp-img" src="/img/generic-karaoke.jpeg" alt="logo">
                             <img class="yelp-img" src="/img/generic-karaoke.jpeg" alt="logo">`
    } else {
        business.photos.forEach(photo => {
            yelpImg.innerHTML += `<img class="yelp-img" src=${photo} alt="logo">`
        })
    }
    for(let i = 1; i <= business.rating; i++) {
        yelpRating.innerHTML += `<img class="star" src="/img/star.png" alt="star">`
    }
    yelpRating.innerHTML += `<p>   - ${business.review_count > 1? `${business.review_count} reviews` : `${business.review_count} review`}   -  ${business.price !== undefined? business.price : "$"}</p>`
    venue.categories.forEach(cat => {
        yelpCat.innerHTML += `<li>${cat.title}</li>`
    })
    if (business.is_closed === false) {
        yelpRating.innerHTML += "<h4 class='open' style='color: green'> - Open</h4>"
    } else {
        yelpRating.innerHTML += "<h4 style='color: red'> - Closed</h4>"
    }
}


let editBtn = document.querySelector('.edit');
let editModal = document.querySelector('.edit-modal')
let submitEditBtn = document.querySelector('.submit-edit');

let createEventBtn = document.querySelector('.create-event');
let createEventModal = document.querySelector('.create-event-modal')
let submitEventBtn = document.querySelector('.submit-edit');

let editEventBtn = document.querySelector('.edit-event');
let formsWrapper = document.querySelector('.forms-wrapper');
let karaoke = document.querySelector('.karaoke');



if (editBtn) {
    submitEditBtn.onclick = () => {
        editModal.style.display = "none";
    }

    editBtn.onclick = () => {
        editModal.style.display = 'flex';
    }

    editEventBtn.onclick = () => {
        formsWrapper.style.display = 'flex';
        karaoke.style.display = 'none';
    }
}

window.onclick = (e) => {
    if (e.target == editModal) {
        editModal.style.display = "none";
    }else if (e.target == createEventModal) {
        createEventModal.style.display = "none";
    }
}

if (createEventBtn) {
    submitEventBtn.onclick = () => {
        createEventModal.style.display = "none";
    }
    createEventBtn.onclick = () => {
        createEventModal.style.display = 'flex';
    }
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





