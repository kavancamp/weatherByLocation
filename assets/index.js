//get & display time
window.onload = function () {
  let now = new Date();
  let todaysDate = now.toLocaleDateString();
  var time = now.getHours() + ":" + now.getMinutes();
  document.getElementById(`date`).innerHTML = `${todaysDate} ${time}`;
};

//get 5-day
/*function getForecast(position) {
  let lat = position.coords.lat;
  let long = position.coords.longitude;
  console.log(lat, long);
  let api_key = "df105d3db4bbc2adb0adee0461f34a46";
  let url = `https:api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&units=imperial&appid=${api_key}`;
  axios.get(url).then(showForecast);
  console.log(url);
}*/
function showForecast() {
  let days = ["Thursday", "Friday", "Saturday", "Sunday", "Monday"];
  let forecastElement = document.querySelector(".day");
  //let forecastHTML = ``;
  days.forEach(function (day) {
    forecastHTML = `
    <p class="h2 fw-normal day-name">${day}</p>
    <p class="h2 fw-normal temperature-max">
    <i class="fas fa-cloud pe-2"></i>
     37
     </p> 
    `;
  });

  forecastElement.innerHTML = forecastHTML + `</div>`;
  console.log(forecastHTML);
}
showForecast();

function changeCity(event) {
  event.preventDefault();

  let city = document.querySelector("#city");
  let cityInput = document.querySelector("#city-input");
  let api_key = "df105d3db4bbc2adb0adee0461f34a46";
  if (cityInput.value) {
    city.innerHTML = cityInput.value;
  }
  let endPoint = "https://api.openweathermap.org/data/2.5/weather?q=";
  let url = `${endPoint}${cityInput.value}&units=imperial&appid=${api_key}`;
  console.log(url);

  axios.get(url).then(showTemp);
}

let cityButton = document.querySelector("#search-form");
cityButton.addEventListener("submit", changeCity);

//get location & display when current is clicked

function getLocation() {
  navigator.geolocation.getCurrentPosition(showLocation);
}
function showLocation(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let api_key = "df105d3db4bbc2adb0adee0461f34a46";
  let endPoint = "https://api.openweathermap.org/data/2.5/weather?";
  let url = `${endPoint}lat=${lat}&lon=${long}&appid=${api_key}&units=imperial`;
  console.log(url);
  console.log(`lat: ${lat}, long: ${long}`);
  axios.get(`${url}`).then(showTemp);
}

function showTemp(response) {
  let name = response.data.name;
  let country = response.data.sys.country;
  let temp = Math.round(response.data.main.temp);
  let feel = Math.round(response.data.main.feels_like);
  let humidity = Math.round(response.data.main.humidity);
  let description = response.data.weather[0].description;
  let icon = response.data.weather[0].icon;
  let speed = response.data.wind.speed;
  // prettier-ignore
  let celTemp = Math.round((temp - 32) * 5 / 9);
  console.log(temp, celTemp);
  document.querySelector("h1").innerHTML = `${name}, ${country}`;
  document.querySelector(".feels_like").innerHTML = `${feel}°`;
  document.querySelector(".description").innerHTML = `${description}`;
  document.querySelector(".humidity").innerHTML = `Humidity: ${humidity}%`;
  document.querySelector(".temp").innerHTML = `${temp}`;
  document.querySelector(".temp-celsius").innerHTML = `${celTemp}`;
  document.querySelector(".wind").innerHTML = `Wind speed: ${speed}mph`;
  document.querySelector(".icon").src =
    "https://openweathermap.org/img/wn/" + icon + ".png";
}

let button = document.querySelector("#current");
button.addEventListener("click", getLocation, showTemp);

function tglC() {
  // prettier-ignore
  let c = document.getElementById("temp-celsius").style.display = "block";
  let f = (document.getElementById("temp").style.display = "none");
}
function tglF() {
  let c = (document.getElementById("temp-celsius").style.display = "none");
  let f = (document.getElementById("temp").style.display = "block");
}

let cT = document.querySelector("#celsius");
cT.addEventListener("click", tglC);
let fT = document.querySelector("#fahrenheit");
fT = fT.addEventListener("click", tglF);
