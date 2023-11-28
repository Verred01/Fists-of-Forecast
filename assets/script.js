function storeSearch() {
    const searchBox = document.getElementById('search-box');
    const searchTerm = searchBox.value.trim();

    if (searchTerm) {
        let searches = JSON.parse(localStorage.getItem('searches')) || [];
        searches.unshift(searchTerm); 
        searches = searches.slice(0, 10); 
        localStorage.setItem('searches', JSON.stringify(searches));

        updateRecentSearches(searches);
    }

    searchBox.value = ''; 
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

window.onload = function() {
    const searches = JSON.parse(localStorage.getItem('searches')) || [];
    updateRecentSearches(searches);
    document.getElementById('search-btn').onclick = storeSearch;
}
//API for fishing areas based on zip code start
function searchFishingAreas(zipCode) {
    fetch("https://wft-geo-db.p.rapidapi.com/v1/geo/adminDivisions", + '?zipCode=' + zipCode)
        .then(response => response.json())
        .then(data => displayFishingAreas(data))
        .catch(error => console.error('Error:', error));
}

function displayFishingAreas(data) {
    const container = document.getElementById('geoApiContainer');
    container.innerHTML = ''; 


    data.forEach(area => {
        const entry = document.createElement('div');
        entry.className = 'fishing-area-entry';
        entry.textContent = area.name; 
        container.appendChild(entry);
    });
}

document.getElementById('search-btn').onclick = function() {
    const zipCode = document.getElementById('search-box').value.trim();
    storeSearch();
    searchFishingAreas(zipCode);
};


//API for weather based on zip code end

// var zipcode = "84103";

function getCurrentWeather() {

    weather = [];

    requestUrl = "https://api.openweathermap.org/data/2.5/weather?" + "lat=" + latitude + "&lon=" + longitude + "&appid=a0290a3291b38896066eaae36dc53ecf";

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            //     todayDateEl.text(city.toUpperCase() + " " + dayjs().format('DD/MM/YYYY'));

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

            // CODE TO DUSPLAY ICONS ACCORDING TO SKY STATUS
            //     if (data.weather[0].main == "Thunderstorm") {
            //         weatherIconEl.attr("class", "fa-solid fa-bolt");

            //     }

            //     else if (data.weather[0].main == "Clouds") {
            //         weatherIconEl.attr("class", "fa-solid fa-cloud");

            //     }

            //     else if (data.weather[0].main == "Rain" || data.weather[0].main == "Drizzle") {
            //         weatherIconEl.attr("class", "fa-solid fa-cloud-rain");

            //     } else if (data.weather[0].main == "Snow") {
            //         weatherIconEl.attr("class", "fa-solid fa-snowflake");
            //     } else if (data.weather[0].main == "Clear") {
            //         weatherIconEl.attr("class", "fa-solid fa-sun");
            //     } else {
            //         weatherIconEl.attr("class", "");
            //     }

            //     for (var i = 0; i < weather.length; i++) {

            //         var liElemt = document.createElement('li');
            //         liElemt.textContent = weather[i];
            //         todayWeatherEl.append(liElemt);
            //     }
            // });
        });
};



// Function to get the latitude and longitude of the search city through the GeoAPI
function getLocation(zipcode) {

    requestUrl = "http://api.openweathermap.org/geo/1.0/zip?zip=" + zipcode + "&appid=a0290a3291b38896066eaae36dc53ecf";
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

getLocation(zipcode);

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



// Event Listener for the submit search button
var searchBtn = $("#search-btn");
// Add event listener to the search button
searchBtn.on('click', submitSearch);

var submitSearch = function (event) {
    event.preventDefault();
    console.log("event triggered");
    zipcode = cityEl.val().trim();
    citySearched = JSON.parse(localStorage.getItem("City Searched"));

    if (city) {
        getLocation(city);
        city = city.toLowerCase();
        if (citySearched == null) {
            citySearched = [city];
            console.log("01")
            storeCity();
        }
        else if (citySearched.includes(city)) {
            console.log(citySearched);
            return citySearched;

        } else {
            citySearched.push(city);
            storeCity();
        }
    }
};