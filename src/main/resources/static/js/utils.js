const isEvenOrOdd = (num) => num % 2 === 0 ? ` is even` : ` is odd`;
//console.log(isEvenOrOdd(0))

const isEven = (num) => num % 2 === 0;

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

let random = Math.floor((Math.random() * 3) + 1);

export function randomNumber (min, max) {
    return Math.floor((Math.random() * (max - min + 1) + min));
}

export function isNumericAndNotNaN (input) {
    return !isNaN(parseFloat(input)) && input !== null && typeof input !== "boolean";
}

export function containsOnlyNumbers(str) {
    return /^([0-9]+\-)*([0-9]+)$/.test(str);
}

const isStringAndNaN = (input) => {
    return isNaN(parseFloat(input)) && input !== null && typeof input !== "boolean" && typeof input === "string";
}

function shuffleArray(array) {
    // Loop through the array from the last index to the first
    for (let i = array.length - 1; i > 0; i--) {
        // Generate a random index between 0 and i
        const j = Math.floor(Math.random() * (i + 1));
        // Swap the elements at index i and j
        [array[i], array[j]] = [array[j], array[i]];
    }
    // Return the shuffled array
    return array;
}

const isConsonant = (letter) => {
    if (typeof letter !== 'string' || letter.length !== 1 || !letter.match(/[a-z]/i)) {
        return false; // input is not a single alphabetical letter
    }
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    return !vowels.includes(letter.toLowerCase());
}

function arrayOfRandomNumbers(lengthOfArray){
    const array = [];
    for (let i = 0; i < lengthOfArray; i++){
        let newRandomNumber = randomNumber(1, lengthOfArray + 100);
        while(array.includes(newRandomNumber)){
            newRandomNumber = randomNumber(1, lengthOfArray + 100);
        }
        array.push(newRandomNumber);
    }
    return array;
}

function removeDuplicates(arr) {
    return arr.filter((item, index) => arr.indexOf(item) === index);
}

//remove duplicate objects from an array
function removeDuplicateObjects(arr) {
    return arr.filter(
        (obj, index, self) =>
            index ===
            self.findIndex((t) => t.name === obj.name)
    );
}

function titleCase(str) {
    return str.toLowerCase().split(' ').map(x=>x[0].toUpperCase()+x.slice(1)).join(' ');
}

function kelvinToFahrenheit(valNum) {
    valNum = parseFloat(valNum);
    return Math.round(((valNum-273.15)*1.8)+32);
}

function formatUnixTimestamp(timestamp) {
    // Create a Date object from the timestamp (which is in seconds)
    const date = new Date(timestamp * 1000);
    // Get the year, month, day, hours, minutes, and seconds from the Date object
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    // Combine the date and time into a string
    const dateString = `${month}-${day}-${year} ${hours}:${minutes}:${seconds}`;
    // Return the formatted string
    return dateString;
}

export function debounce(func, delay) {
    let timer;
    return function(...args) {
        const context = this;
        clearTimeout(timer);
        timer = setTimeout(() => func.apply(context, args), delay);
    };
}