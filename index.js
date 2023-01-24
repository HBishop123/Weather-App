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
    `https://api.openweathermap.org/data/2.5/weather?q=${weatherData.place}&appid=01140b4c9927771a31d8304a92387fdb`,
    { mode: "cors" }
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      weatherData.place = data.name;
      weatherData.weather = data.weather[0].description.toUpperCase();
      weatherData.temperature =
        parseFloat((data.main.temp - 273.15).toFixed(2)) + "°C";
      weatherData.feelsLike =
        parseFloat(data.main.feels_like - 273.15).toFixed(2) + "°C";
      weatherData.humidity = data.main.humidity + "%";
      weatherData.chanceOfRain = "0%";
      weatherData.windSpeed = data.wind.speed + "m/s";
      pushInformationToPage.pushInfo();
    })
    .catch(() => {
      const errorMessage = document.getElementById("error");
      errorMessage.innerHTML =
        "Could not find location. Please check your spelling, or try a different location";
      setTimeout(() => {
        errorMessage.innerHTML = "";
      }, 5000);
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

const changeDegreesValue = {
  swapDegrees: function () {
    const temperature = document.getElementById("temperature");
    const temperatureValue = temperature.innerHTML;
    const feelsLike = document.getElementById("feels-like");
    const feelsLikeValue = feelsLike.innerHTML;

    const removeCelsiusUnit = temperatureValue.replace(/[^0-9.-]+/g, "");
    const fahrenheitValue = (removeCelsiusUnit * 9) / 5 + 32;

    const removeFahrenheitUnit = temperatureValue.replace(/[^0-9.-]+/g, "");
    const celsiusValue = ((removeFahrenheitUnit - 32) * 5) / 9;

    const removeCelsiusUnitForFeelsLike = feelsLikeValue.replace(
      /[^0-9.-]+/g,
      ""
    );
    const fahrenheitValueForFeelsLike =
      (removeCelsiusUnitForFeelsLike * 9) / 5 + 32;

    const removeFahrenheitUnitForFeelsLike = feelsLikeValue.replace(
      /[^0-9.-]+/g,
      ""
    );
    const celsiusValueForFeelsLike =
      ((removeFahrenheitUnitForFeelsLike - 32) * 5) / 9;

    if (temperatureValue.includes("°C")) {
      temperature.innerHTML = fahrenheitValue.toFixed(2) + "°F";
      feelsLike.innerHTML = fahrenheitValueForFeelsLike.toFixed(2) + "°F";
    } else if (temperatureValue.includes("°F")) {
      temperature.innerHTML = celsiusValue.toFixed(2) + "°C";
      feelsLike.innerHTML = celsiusValueForFeelsLike.toFixed(2) + "°C";
    }
  },
  attachEventListenerTemp: function () {
    document.addEventListener("DOMContentLoaded", () => {
      document
        .getElementById("temperature")
        .addEventListener("click", this.swapDegrees);
    });
  },
  attachEventListenerFeels: function () {
    document.addEventListener("DOMContentLoaded", () => {
      document
        .getElementById("feels-like")
        .addEventListener("click", this.swapDegrees);
    });
  },
};
changeDegreesValue.attachEventListenerTemp();
changeDegreesValue.attachEventListenerFeels();
