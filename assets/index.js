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
cityButton.addEventListener("click", changeCity);

//get & display time
window.onload = function () {
  let now = new Date();
  let date = now.getDate();
  let year = now.getFullYear();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[now.getMonth()];

  let today = `Today is ${day}, ${month} ${date}, ${year}`;
  document.getElementById("date").innerHTML = today;
};

//get location & display when current is clicked

function showLocation(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let api_key = "df105d3db4bbc2adb0adee0461f34a46";
  let endPoint = "https://api.openweathermap.org/data/2.5/weather?";
  let url = `${endPoint}lat=${lat}&lon=${long}&appid=${api_key}&units=imperial`;

  console.log(url);
  console.log(`lat: ${lat}, long: ${long}`);
  console.log();
  axios.get(`${url}`).then(showTemp);
}

function getLocation() {
  navigator.geolocation.getCurrentPosition(showLocation);
}

function showTemp(response) {
  console.log(response.data);
  console.log(response.data.weather[0].icon);
  let name = response.data.name;
  let country = response.data.sys.country;
  let temp = Math.round(response.data.main.temp);
  let feel = response.data.main.feels_like;
  let humidity = response.data.main.humidity;
  let description = response.data.weather[0].description;
  let icon = response.data.weather[0].icon;
  let speed = response.data.wind.speed;
  let source = "https://openweathermap.org/img/wn/";

  document.querySelector("h1").innerHTML = `${name}, ${country}`;
  document.querySelector(".icon").src.innerHTML = `${source}${icon}.png`;
  document.querySelector(".feels_like").innerHTML = `${feel}°`;
  document.querySelector(".description").innerHTML = `${description}`;
  document.querySelector(".humidity").innerHTML = `Humidity: ${humidity}%`;
  document.querySelector(".temp").innerHTML = `${temp} °F`;
  document.querySelector(".wind").innerHTML = `Wind speed: ${speed}mph`;
}

let button = document.querySelector("#current");
button.addEventListener("click", getLocation, showTemp);
