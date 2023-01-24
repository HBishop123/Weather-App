// Object Containing Location
weatherData = {
  place: "London",
  weather: undefined,
  temperature: undefined,
  feelsLike: undefined,
  humidity: undefined,
  chanceOfRain: undefined,
  windSpeed: undefined,
};

console.log(weatherData);

// Fetch request for weather Data
const fetchRequest = function () {
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${weatherData.place},uk&appid=01140b4c9927771a31d8304a92387fdb`,
    { mode: "cors" }
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      weatherData.place = data.name;
      weatherData.weather = data.weather[0].description;
      weatherData.temperature = data.main.temp;
      weatherData.feelsLike = data.main.feels_like;
      weatherData.humidity = data.main.humidity;
      weatherData.chanceOfRain = "Chance of Rain";
      weatherData.windSpeed = data.wind.speed;
      pushInformationToPage.pushInfo();
    });
};
fetchRequest();

const pushInformationToPage = {
  pushInfo: function () {
    const cloudData = document.querySelector("h2");
    cloudData.innerHTML = weatherData.weather;

    const locationData = document.getElementById("location");
    locationData.innerHTML = weatherData.place;

    const feelsLike = document.getElementById("feels-like");
    feelsLike.innerHTML = weatherData.feelsLike;

    const humidity = document.getElementById("humidity");
    humidity.innerHTML = weatherData.humidity;

    const temperature = document.getElementById("temperature");
    temperature.innerHTML = weatherData.temperature;

    const chanceOfRain = document.getElementById("chance-rain");
    chanceOfRain.innerHTML = weatherData.chanceOfRain;

    const windChance = document.getElementById("wind");
    windChance.innerHTML = weatherData.windSpeed;
  },
};

// grabs input Data and changes the locations.place
const getInputData = {
  grabInputData: function (e) {
    e.preventDefault();

    const chosenLocation = document.getElementById("search-bar").value;
    console.log(chosenLocation);

    weatherData.place = chosenLocation;
    document.forms[0].reset();
    fetchRequest();
    return this.location;
  },

  attachEventListener: function () {
    document.addEventListener("DOMContentLoaded", () => {
      document
        .getElementById("submit")
        .addEventListener("click", this.grabInputData);
    });
  },
};
getInputData.attachEventListener();
