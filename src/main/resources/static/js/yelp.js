(async () => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer' + yelpKey,
            }
        };

        fetch('https://api.yelp.com/v3/businesses/${venue.yelp_id}/reviews?limit=20&sort_by=yelp_sort', options)
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.error(err));
    }
)