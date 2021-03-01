import { getData, getInfo, getImg } from './fetch.mjs';
import { displayWeather } from './weather.mjs';
import { toggleVisitedCity, addCityToLS } from './localStorage.mjs';

const nav = document.querySelector('.navbar');
const body = document.getElementById('home');
const root = document.getElementById('root');

export const displayCity = () => {
  nav.addEventListener('click', addCityName);
};

const addCityName = (e) => {
  if (e.target.classList.contains('dropdown-item')) {
    // body.style.backgroundImage = 'url("../../dist/img/bg-backpack-opac.png")';
    let cityName = e.target.textContent;
    root.innerHTML = '';

    let cityID = e.target.parentNode.id;

    displayCityInfo(cityID);
    displayImg(cityName);
    displayWeather(cityName);
  }
};

const displayCityInfo = (cityID) => {
  getData().then((data) => {
    data[1].forEach((city) => {
      if (cityID == city.id) {
        const cityName = city.stadname;
        const population = city.population;
        root.insertAdjacentHTML(
          'beforeend',
          `<div class="card w-50 m-5 p-3">
          <div class="card-body">
            <div class="title-container">
            <h3 class="card-title" id=${city.id}>${cityName}</h3>
            </div>
            <h4>Antal invånare: ${population}</h4>
            <div class="form-check form-switch mt-3">
            <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault">
            <label class="form-check-label" for="flexSwitchCheckDefault">Besökt</label>
          </div>
            <p class="card-text" id="info"></p>`
        );

        toggleVisitedCity(city.id);
        addCityToLS(city.id);

        getInfo(cityName).then((data) => {
          console.log('Wikipedia API', data);
          const info = document.getElementById('info');
          const excerpt = data.extract;

          info.insertAdjacentHTML(
            'afterbegin',
            `${excerpt}    
            </div>
          </div>`
          );
        });
      }
    });
  });
};

const displayImg = (city) => {
  getImg(city).then((data) => {
    console.log('Unsplash API', data);

    body.style.background = `url('https://source.unsplash.com/1600x900/?${city}') center no-repeat`;
    body.style.backgroundSize = 'cover';
    body.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    body.style.backgroundBlendMode = 'multiply';
    body.style.height = '100vh';
  });
};