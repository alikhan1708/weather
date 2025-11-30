let apikey = 'b51f1cd5c8cfe17efe1ca3f912bc7b95';
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=`;

let weather = document.querySelector(".weather");
let error = document.querySelector(".error");

let searchInput = document.querySelector(".search-box input");
let searchButton = document.querySelector(".search-box button");

let weatherIcon = document.querySelector(".weather-image i");

async function checkWeather(city) {
    let responce = await fetch(`${apiUrl}${city}&appid=${apikey}&units=metric`);
    if(responce.status == 404){
        error.style.display = "block";
        weather.style.display = "none";
    }
    let data = await responce.json();
    console.log(data);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "&deg;C";
    document.querySelector(".humidity").innerHTML = Math.round(data.main.humidity) + "%";
    document.querySelector(".wind").innerHTML = Math.round(data.wind.speed) + "км/ч";

    if(data.weather[0].main == "Clear"){
        weatherIcon.className = "fa-solid fa-sun";
    }   else if (data.weather[0].main == "Rain") {
        weatherIcon.className = "fa-solid fa-cloud-rain";
    }   else if (data.weather[0].main == "Snow") {
        weatherIcon.className = "fa-solid fa-snowflake";
    }   else if (data.weather[0].main == "Clouds") {
        weatherIcon.className = "fa-solid fa-cloud";
    }

    weather.style.display = "block";
    error.style.display = "none";
}

searchButton.addEventListener("click", () => {
    checkWeather(searchInput.value);
    searchInput.value = "";
});
searchInput.addEventListener("keyup", (e) => {
    if(e.keyCode == 13){
        checkWeather(searchInput.value);
        searchInput.value = "";
    }
});