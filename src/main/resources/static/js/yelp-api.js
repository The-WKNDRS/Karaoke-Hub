
(async() => {
        async function search(query) {
            try {
                let url = window.location.protocol + '//' + window.location.host + '/yelp/' + query.trimEnd() + '?location=' + searchLocation.val();
                let response = await fetch(url);
                if (response.ok) {
                    let venuesJson = await response.json();
                    venuesJson.forEach(function(currentVenue) {
                        console.log(currentVenue)
                    });
                } else {
                    console.log('Error:', response.status);
                }
            } catch (error) {
                console.log('Error:', error);
            }
        }

})();

