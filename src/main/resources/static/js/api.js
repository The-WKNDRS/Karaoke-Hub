let endpoint = 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=san%20antonio&term=karaoke&sort_by=best_match&limit=20'
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer 2GcKsiasG148oNxhkk8NC_db3KvAqwYYsDmWNxo2xswrAIG68XtQ53f_BhD402yNgQp2HtnpjTRwbcTMt_oJqgIHgXkaR0cxAdilrur6ZdzofNILZo9skANOTZJ_ZHYx'
    }
};
let url = endpoint;

const getYelp = async () => {
    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(venuesJson) {
            console.log(venuesJson)
        });
}
(async() => {
    await getYelp();
})();

