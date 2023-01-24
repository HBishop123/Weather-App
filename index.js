// Object Containing Location
locations = {
  place: "London",
};
console.log(locations);

// Fetch request for weather Data
const fetchRequest = function () {
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${locations.place},uk&appid=01140b4c9927771a31d8304a92387fdb`,
    { mode: "cors" }
  ).then((response) => response.json().then((data) => console.log(data)));
};
fetchRequest();

// grabs input Data and changes the locations.place
const getInputData = {
  grabInputData: function (e) {
    e.preventDefault();

    const chosenLocation = document.getElementById("search-bar").value;
    console.log(chosenLocation);

    locations.place = chosenLocation;
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


