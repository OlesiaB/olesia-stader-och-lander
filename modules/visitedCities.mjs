import { getData, getImg } from './fetch.mjs';
import { toggleVisitedCity, addCityToLS } from './localStorage.mjs';
import { displayCityInfo, displayImg } from './city.mjs';
import { displayWeather } from './weather.mjs';

const visitedCitiesBtn = document.getElementById('visited-cities');
const root = document.getElementById('root');

export const displayVisitedCities = () => {
  visitedCitiesBtn.addEventListener('click', () => {
    root.innerHTML = '';
    root.insertAdjacentHTML('beforeend', '<div class="row p-3">');
    const flexContainer = document.querySelector('.row');
    if (!localStorage.getItem('visitedCities')) {
      console.log('There is nothing to display');
    } else {
      let visitedCities = JSON.parse(localStorage.getItem('visitedCities'));
      for (let city in visitedCities) {
        getData().then((data) => {
          let cityData = data[1].find(({ id }) => id == visitedCities[city]);
          let cityName = cityData.stadname;
          let cityID = cityData.id;
          flexContainer.insertAdjacentHTML(
            'beforeend',
            `
          <div class="col-sm-3">
            <div class="card mb-3" id="card${cityID}">
              <img class="card-img-top" id="${cityName}">
              <div class="card-body">
              <div class="title-container">
                <h5 class="card-title" id="weather${cityName}">${cityName}</h5>
              </div>
                <div class="form-check form-switch mt-1">
                  <input class="form-check-input" type="checkbox" id="switch${cityID}">
                  <label class="form-check-label" for="switch${cityID}">Besökt</label>
                </div>
                <button class="btn btn-secondary mt-3" id="btn${cityID}">Läs mer </button>
              </div>
            </div>
          </div>
          `
          );
          displayCardImg(cityName);
          toggleVisitedCity(cityID);
          addCityToLS(cityID, true);
          displayWeather(cityName);

          const btn = document.getElementById(`btn${cityID}`);
          btn.addEventListener('click', () => {
            root.innerHTML = '';
            displayCityInfo(cityID);
            displayImg(cityName);
            displayWeather(cityName);
          });
        });
      }
      root.insertAdjacentHTML('beforeend', '</div>');
    }
  });
};

const displayCardImg = (cityName) => {
  let img = document.getElementById(cityName);
  getImg(cityName).then((data) => {
    img.src = data.urls.regular;
  });
};
