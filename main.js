const input = document.querySelector(".card__search");
const content = document.querySelector(".card__content");
const city = document.querySelector(".content__city");
const country = document.querySelector(".content__country");
const currentTime = document.querySelector(".content__time");
const temperature = document.querySelector(".content__temperature span");
const weather = document.querySelector(".content__weather");
const visibility = document.querySelector(".content__foresight span");
const wind = document.querySelector(".content__wind span");
const summer = document.querySelector(".content__summer span");
const body = document.querySelector("body");
function getTimeDate() {
  const today = new Date();
  const date =
    today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();
  let time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  if (today.getHours() >= 12) {
    time = time + " PM";
  } else {
    time = time + " AM";
  }
  const dateTime = date + ", " + time;
  return dateTime;
}
render("quang ngai");
async function render(inputValue) {
  const aptWeather = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=fea8a62f1da652753a53b9b0bec8f75d`;
  const data = await fetch(aptWeather).then((response) => response.json());
  if (data.cod === 200) {
    content.classList.remove("hide");
    city.innerText = data.name;
    country.innerText = data.sys.country;
    currentTime.innerText = getTimeDate();
    const valueTemplate = Math.round(data.main.temp - 273.15);
    temperature.innerText = valueTemplate;
    weather.innerText = data.weather[0].main;
    visibility.innerText = data.visibility + " (m)";
    wind.innerText = data.wind.speed + " m/s";
    summer.innerText = data.clouds.all + " %";

    if (valueTemplate < 18) {
      body.classList.add("cold");
    } else if (valueTemplate > 26) {
      body.className = "";
      body.classList.add("hot");
    } else {
      body.className = "";
      body.classList.add("warm");
    }
  } else {
    content.classList.add("hide");
  }
}
document.addEventListener("keydown", (e) => {
  if (e.code === "Enter") {
    const inputValue = input.value.trim();
    render(inputValue);
  }
});
