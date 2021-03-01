import { getWeatherData } from './fetch.mjs';

export const displayWeather = (cityName) => {
  getWeatherData(cityName).then((data) => {
    console.log('Weather API', data);
    const h3 = document.querySelector('.card-title');
    h3.insertAdjacentHTML(
      'afterend',
      `<div class="weather"><img src="http://openweathermap.org/img/w/${
        data.weather[0].icon
      }.png"/><span>${Math.floor(data.main.temp)}&#176;C</span></div>`
    );
  });
};
