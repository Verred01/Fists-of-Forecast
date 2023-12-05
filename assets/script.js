var searchBtn = document.getElementById("search-btn");
var searchBox = document.getElementById("search-box");
console.log(searchBtn);
console.log(searchBox);
var searchTerm;
var zipcode;
var weatherInfoEl = document.getElementById("weather-info");
var latitude, longitude;
var today = document.getElementById('today');
var jokeEl = document.getElementById("search-btn")

function storeSearch(searchTerm) {
    let searches = JSON.parse(localStorage.getItem('searches')) || [];
    console.log(searchTerm);
    searches.unshift(searchTerm);
    searches = searches.slice(0, 10);
    localStorage.setItem('searches', JSON.stringify(searches));
    updateRecentSearches(searches);
    searchBox.value = '';
    return searches;
}

function updateRecentSearches(searches) {
    const recentSearches = document.getElementById('recent-searches');
    recentSearches.innerHTML = '';

    searches.forEach(term => {
        const entry = document.createElement('div');
        entry.className = 'search-history-entry';
        entry.textContent = term;
        recentSearches.appendChild(entry);
    });
}

document.getElementById('search-btn').onclick = function () {
    var zipcode = searchBox.value; // Get the zip code from the input box
    if (zipcode) {
        storeSearch(zipcode);
        getLocation(zipcode); // Call getLocation with the zip code
    }
};

//API for weather based on zip code end
function getCurrentWeather() {
    weather = [];

    requestUrl = "https://api.openweathermap.org/data/2.5/weather?" + "lat=" + latitude + "&lon=" + longitude + "&appid=a0290a3291b38896066eaae36dc53ecf";
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            sky = data.weather[0].main;
            console.log(sky);
            temp = "Temp: " + Math.round(1.8 * (data.main.temp - 273) + 32) + " °F";
            console.log(temp);
            minTemp = "Min Temp: " + Math.round(1.8 * (data.main.temp_min - 273) + 32) + " °F";
            console.log(minTemp);
            maxTemp = "Max Temp: " + Math.round(1.8 * (data.main.temp_max - 273) + 32) + " °F";
            console.log(maxTemp);
            wind = "Wind: " + Math.round(data.wind.speed * 2.236936) + " MPH";
            console.log(wind);
            humidity = "Humidity: " + data.main.humidity + " %";
            console.log(humidity);
            sunrise = data.sys.sunrise;
            console.log(sunrise);
            sunset = data.sys.sunset;
            console.log(sunset);
            sunriseTime = timeConversion(sunrise);
            sunsetTime = timeConversion(sunset);
            console.log(typeof sunriseTime);

            weather = [sky, temp, minTemp, maxTemp, wind, humidity, sunriseTime, sunsetTime];
            console.log(weather);

            displayWeather(weather);
        });
};
// Function to get the latitude and longitude of the search city through the openweatherAPI
function getLocation(zipcode) {
    requestUrl = "https://api.openweathermap.org/geo/1.0/zip?zip=" + zipcode + "&appid=a0290a3291b38896066eaae36dc53ecf";
    //why is the following line not working?
    // todayDateEl.text(city.toUpperCase() + " " + dayjs().format('DD/MM/YYYY'));
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            latitude = data.lat;
            longitude = data.lon;
            getCurrentWeather();
        });
};
// Function to convert time in Unix into HH:MM:SS
function timeConversion(unixTimestamp) {
    //Since JavaScript works in milliseconds, you should convert 
    // the time into milliseconds by multiplying it by 1000.
    let date = new Date(unixTimestamp * 1000);
    // Hours part from the timestamp
    let hours = date.getHours();
    // Minutes part from the timestamp
    let minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    let seconds = "0" + date.getSeconds();
    // Will display time in 11:10:22 format
    let formatTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    console.log(formatTime);
    return formatTime;
};

function displayWeather(weather) {
    for (var i = 0; i < weather.length; i++) {
        weatherInfoEl.children[i].textContent = weather[i];
        console.log(weatherInfoEl.children[i]);
    }//Works! do not touch above this line
};
// Chuck Norris API
function displayJoke() {
    fetch('https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/random', {
        headers: {
            "X-RapidAPI-Key": "0be76eb0b8mshf435796480fa159p129846jsn6d77e278b00d",
            "Accept": "application/json"
        }
    })
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById("chuck-norris-joke"); // specifies the container to be used
            const newJokeEl = document.createElement("p"); // Create a new paragraph element
            newJokeEl.textContent = data.value; // Set the text of the paragraph to the joke
            container.appendChild(newJokeEl); // Appends the new <p> to the assigned container
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
document.getElementById('search-btn').addEventListener('click', displayJoke);
//works! do not alter above this line under pain of death
