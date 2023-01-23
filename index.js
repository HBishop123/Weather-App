fetch(
  "http://api.openweathermap.org/data/2.5/weather?q={London}&appid={f2702338122078f9274942735eac40e4}",
  { mode: "cors" }
).then(function (response) {
  console.log(response.json());
});

// create dropdown that has search list of cities. Create page of wather based off cirty selected