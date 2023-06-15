
export async function searchVenue(query, zipcode) {
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

