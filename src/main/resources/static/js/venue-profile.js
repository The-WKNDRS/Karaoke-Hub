// uses fetched yelp data to display it on the page
const addColon = (time) => {
    let newTime = time.split('');
    newTime.splice(2, 0, ':');
    return newTime.join('');
}

const getDay = (day) => {
    switch (day) {
        case 0:
            return "Mon"
            break;
        case 1:
            return "Tue"
            break;
        case 2:
            return "Wed"
            break;
        case 3:
            return "Thu"
            break;
        case 4:
            return "Fri"
            break;
        case 5:
            return "Sat"
            break;
        case 6:
            return "Sun"
            break;
    }
}

const getDayClass = (day) => {
    switch (day) {
        case 0:
            return "one"
            break;
        case 1:
            return "two"
            break;
        case 2:
            return "three"
            break;
        case 3:
            return "four"
            break;
        case 4:
            return "five"
            break;
        case 5:
            return "six"
            break;
        case 6:
            return "seven"
            break;
    }
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
    let yelpDays = document.querySelector('.days');
    let yelpHours = document.querySelector('.hours');
    let name = document.querySelector('.name');
    name.innerHTML = `<h3>${business.name}</h3>`
    console.log(business)
    let el = document.createElement('div');
    if (business.hasOwnProperty('display_phone')) {
        yelpPhone.innerText = "No phone number available";
    } else {
        yelpPhone.innerText = business.display_phone;
    }
    if (business.hasOwnProperty('hours')) {
        let days = business.hours[0].open;
        for(let i = 0; i < days.length; i++) {
            let el = document.querySelector(`.${getDayClass(days[i].day)}`);
            el.innerHTML = `<p>${days[i].start} - ${days[i].end}</p>`
        }
    } else {
        let businessHours = document.querySelector('.business-hours');
        businessHours.innerHTML = `<p>Hours not available</p>`
    }

    if (business.hasOwnProperty('photos')) {
        if (business.photos.length < 1) {
            yelpImg.innerHTML = `<img class="yelp-img" src="/img/generic-karaoke.jpeg" alt="logo">
                             <img class="yelp-img" src="/img/generic-karaoke.jpeg" alt="logo">
                             <img class="yelp-img" src="/img/generic-karaoke.jpeg" alt="logo">`
        } else {
            business.photos.forEach(photo => {
                yelpImg.innerHTML += `<img class="yelp-img" src=${photo} alt="logo">`
            })
        }
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
    let pageWrapper = document.querySelector('.page-wrapper');
    pageWrapper.style.display = 'flex';
}


let editBtn = document.querySelector('.edit');
let editModal = document.querySelector('.edit-modal')
let submitEditBtn = document.querySelector('.submit-edit');

let createEventBtn = document.querySelector('.create-event');
let createEventModal = document.querySelector('.create-event-modal')
let submitEventBtn = document.querySelector('.submit-edit');


let editEventBtn = document.querySelector('.edit-event');
let editForm = document.querySelector('.edit-event-form');
let formsWrapper = document.querySelector('.forms-wrapper');
let karaoke = document.querySelector('.karaoke');
let editIcons = document.querySelectorAll('.edit-icon');
let deleteIcons = document.querySelectorAll('.delete-icon');
let goBack = document.querySelector('.go-back');
let x = document.querySelector('.x');
let editSelect = document.querySelector('.day-select');
let editOptions = document.querySelectorAll('.day-edit option');

if (editBtn) {
    submitEditBtn.onclick = () => {
        editModal.style.display = "none";
    }

    editBtn.onclick = () => {
        editModal.style.display = 'flex';
    }

    editEventBtn.onclick = () => {
            x.classList.toggle('hide');
            editIcons.forEach(icon => {
                icon.classList.toggle('hide');
            })
            deleteIcons.forEach(icon => {
                icon.classList.toggle('hide');
            })
            editEventBtn.classList.toggle('go-back')
            editEventBtn.classList.toggle('edit-event')
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
let eventModal;
let eventId;
if (editIcons.length > 0) {
    editIcons.forEach(icon => {
        icon.onclick = (e) => {
            eventId = e.target.id;
            let selector = eventId + 'e';
            eventModal = document.getElementById(selector);
            console.log(eventId);
            eventModal.style.display = 'flex';
            console.log(eventId)
        }
    })
}

( async () => {
    let yelpName = document.querySelector('.venueName');
    let yelpZip = document.querySelector('.venueZip');
    let yelpVal = yelpName.value;
    console.log(yelpVal)
    let yelpZipVal = yelpZip.value;
    console.log(yelpZipVal)
    await getVenues(yelpVal, yelpZipVal);
})()


// shows all comments and rotates arrow on button
let seeAllBtn = document.querySelector('.see-all');
let reviewWrapper = document.querySelector('.reviews-wrapper')
let commentArrow = document.querySelector('.comment-arrow');
if (seeAllBtn) {
    seeAllBtn.onclick = () => {
        reviewWrapper.classList.toggle('show')
        reviewWrapper.classList.toggle('reviews-wrapper')
        commentArrow.classList.toggle('show-less')
        commentArrow.classList.toggle('comment-arrow')
    }
}


window.onclick = (e) => {
    if (e.target == editModal) {
        editModal.style.display = "none";
    } else if (e.target == createEventModal) {
        createEventModal.style.display = "none";
    } else if (e.target == eventModal) {
        eventModal.style.display = "none";
    }
}

const appear = document.querySelectorAll('.appear');
const cb = function(entries){
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add('inview');
        }
    });
}
const io = new IntersectionObserver(cb);
appear.forEach(el => io.observe(el));






