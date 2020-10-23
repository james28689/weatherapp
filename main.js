const api = {
    key: "4c123d1ba1f482bf73039fd6140eb021",
    baseurl: "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector(".search-box");
searchbox.addEventListener("keypress", setQuery);

//const locationButton = document.querySelector(".location-button");
//locationButton.addEventListener("click", useLocation);

function setQuery(event) {
    if (event.keyCode == 13) {
        getResults(searchbox.value);
        searchbox.value = "";
    }
}

window.addEventListener("load", ()=> {
    let long;
    let lat;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            getResultsLoc(position.coords.longitude, position.coords.latitude);
        });
    } else {
        console.log("Browser does not support geolocation.")
    }
});

function getResults(query) {
    fetch(`${api.baseurl}weather?q=${query}&units=metric&appid=${api.key}`)
    .then(weather => {
        return weather.json();
    })
    .then(displayResults);
}

function getResultsLoc(long, lat) {
    console.log(long);
    console.log(lat);
    fetch(`${api.baseurl}weather?lat=${lat}&lon=${long}&units=metric&appid=${api.key}`)
    .then(weather => {
        return weather.json();
    })
    .then(displayResults);
}

function displayResults(weather) {
    let city = document.querySelector(".location .city");
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date()
    let date = document.querySelector(".location .date");
    date.innerText = dateBuilder(now);

    let temp = document.querySelector(".current .temp");
    temp.innerHTML =  `${Math.round(weather.main.temp)}<span>°C</span>`;

    let weather_el = document.querySelector(".current .weather");
    weather_el.innerText = weather.weather[0].main;

    let weather_img = document.querySelector(".current .weather-img");
    weather_img.innerHTML = `<img src='http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png' />`

    let hilow = document.querySelector(".hi-low");
    hilow.innerText = `${Math.round(weather.main.temp_min)}°C / ${Math.round(weather.main.temp_max)}°C`;
}

function dateBuilder(d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}

if ("serviceWorker" in navigator) {
	window.addEventListener("load", function() {
		navigator.serviceWorker
		.register("./serviceWorker.js")
		.then(res => console.log("service worker registered"))
		.catch(err => console.log("service worker not registered", err))
	})
}