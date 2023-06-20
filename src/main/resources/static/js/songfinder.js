const apiUrl = 'https://api.openai.com/v1/completions';

const form = document.getElementById('song-finder-form');
const songListContainer = document.querySelector('.song-list');

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
    event.preventDefault(); // Prevent the default form submission

    const formData = new FormData(form);

    const vocalType = formData.get('vocalType');
    const musicGenre = formData.get('musicGenre');
    const era = formData.get('era');

    const prompt = `You are a karaoke song finder. Find 10 songs with vocal type: ${vocalType}, music genre: ${musicGenre}, and era: ${era}. Return the song name and artist.`;

    // Make a request to your server to fetch the API key
    fetch('/api/get-api-key')
        .then(response => response.text())
        .then(apiKey => {
            const trimmedApiKey = apiKey.trim(); // Remove any leading/trailing whitespace

            const requestBody = {
                model: 'text-davinci-003',
                prompt: prompt,
                max_tokens: 150,
                temperature: 0,
            };

            // Make an API request to ChatGPT using the retrieved API key
            fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + trimmedApiKey,
                },
                body: JSON.stringify(requestBody),
            })
                .then(response => response.json())
                .then(result => {
                    console.log('ChatGPT API Response:', result);
                    handleApiResponse(result);
                })
                .catch(error => {
                    console.error('Error:', error);
                    // Handle the error condition
                });
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle the error condition
        });
}

function handleApiResponse(response) {
    const songList = parseSongList(response);
    renderSongList(songList);
}

function parseSongList(response) {
    const songList = [];

    if (response && response.choices && response.choices.length > 0) {
        const choices = response.choices[0];
        const text = choices.text.trim();

        // Split the text into individual songs
        const songs = text.split('\n');

        // Process each song
        for (const song of songs) {
            const songInfo = song.trim().split('. ');
            if (songInfo.length === 2) {
                const name = songInfo[1];
                const artist = songInfo[0].replace(/^\d+\.\s/, '');
                songList.push({ name, artist });
            }
        }
    }

    return songList;
}

function renderSongList(songList) {
    // Clear the existing song list
    songListContainer.innerHTML = '';

    // Iterate over the songs and create HTML elements
    for (const song of songList) {
        const songName = document.createElement('h2');
        songName.textContent = song.name;

        const songContainer = document.createElement('div');
        songContainer.appendChild(songName);

        songListContainer.appendChild(songContainer);
    }
}
