
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

let address = document.getElementById('address');
let city = document.getElementById('city');
let state = document.getElementById('state');
let name = document.getElementById('name');
let zipcode = document.getElementById('zip_code');
let createBtn = document.getElementById('create-btn');
let confirmBtn = document.getElementById('confirm-btn');
let yelpName = document.getElementById('yelp-name');
let yelpAddress = document.getElementById('yelp-address');
let yelpCity = document.getElementById('yelp-city');
let yelpState = document.getElementById('yelp-state');
let confirmDiv = document.querySelector('.confirm');


createBtn.addEventListener('click', async () => {
    let data = await searchVenue(name.value, zipcode.value);
    address.value = data[0].location.address1;
    city.value = data[0].location.city;
    state.value = data[0].location.state;
    createBtn.style.display = 'none';
    confirmBtn.style.display = 'inline-block';
    confirmDiv.style.display = 'flex';
});


