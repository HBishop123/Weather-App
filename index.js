fetch(
  "http://api.openweathermap.org/data/2.5/weather?q=london,uk&appid=01140b4c9927771a31d8304a92387fdb",
  { mode: "cors" }
).then((response) => response.json().then((data) => console.log(data)));


// create dropdown that has search list of cities. Create page of wather based off cirty selected
