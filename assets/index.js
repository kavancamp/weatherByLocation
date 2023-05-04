//get & display time
window.onload = function () {
  let now = new Date();
  let todaysDate = now.toLocaleDateString();
  var time = now.getHours() + ":" + now.getMinutes();
  document.getElementById(`date`).innerHTML = `${todaysDate} ${time}`;
};

//get 5-day
function getForecast(coordinates) {
  let api_key = "6569c41e8480d62af539a47927fda54c";
  let url = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${api_key}&units=imperial`;
  axios
    .get(url)
    .then(showForecast)
    .catch((e) => {
      console.log(e);
    });
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}
function showForecast(response) {
  let forecast = response.data.daily.slice(1, 6);
  console.log(response);
  let forecastElement = document.querySelector(".forecast-container");
  let forecastHTML = ` <div class="d-flex day" style="display: flex;
  justify-content: space-around; align-items: center; flex-direction: row; flex-wrap: wrap;">`;
  forecast.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
    <p class="h2 fw-normal day-name" style="flex-basis: 33.3%">${formatDay(
      day.dt
    )}</p>
     <p class="h2 fw-normal" style=" flex-basis: 33.3%;">
    <img 
      src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png"
      class="card-img-top" style="width: 50px; height: 50px;"
      alt="${day.weather[0].description}"
    />
     </p> 
     <p class="h2 fw-normal"  style="flex-basis:33.3%;">
    ${Math.round(day.temp.day)} °F </p>
   
    `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

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
  axios
    .get(url)
    .then(showTemp)
    .catch((e) => {
      console.log(e);
    });
}

let cityButton = document.querySelector("#search-form");
cityButton.addEventListener("submit", changeCity);

//get location & display when current is clicked

function getLocation(event) {
  event.preventDefault();
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
  axios
    .get(`${url}`)
    .then(showTemp)
    .catch((e) => {
      console.log(e);
    });
  console.log(url);
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
  getForecast(response.data.coord);
}

let button = document.querySelector("#current");
button.addEventListener("click", getLocation);

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
