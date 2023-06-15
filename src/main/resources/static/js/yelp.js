// Start async function and use key to access Yelp API
// async () => {
const request = async () => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer' + yelpKey,
            }
        };
        // Make an API call to the Yelp Fusion API
        console.log("hello")
    // https://cors-anywhere.herokuapp.com/ possible cors workaround
        fetch('https://api.yelp.com/v3/businesses/the-stetson-bar-san-antonio', options)
            .then(response => response.text())
            .then((data) => console.log(data))
            .catch(err => console.error(err));
    }
(async () => {await request();})();