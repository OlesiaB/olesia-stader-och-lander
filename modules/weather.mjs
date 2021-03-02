import { getWeatherData } from './fetch.mjs';

export const displayWeather = (cityName) => {
  getWeatherData(cityName).then((data) => {
    const h3 = document.getElementById(`weather${cityName}`);
    h3.insertAdjacentHTML(
      'afterend',
      `<div class="weather"><img src="http://openweathermap.org/img/w/${
        data.weather[0].icon
      }.png"/><span>${Math.floor(data.main.temp)}&#176;C</span></div>`
    );
  });
};
