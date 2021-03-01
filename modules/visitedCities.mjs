import { getData, getImg } from './fetch.mjs';
import { toggleVisitedCity, addCityToLS } from './localStorage.mjs';

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
            <div class="card mb-3">
              <img class="card-img-top" id="${cityName}">
              <div class="card-body">
                <h5 class="card-title">${cityName}</h5>
                <div class="form-check form-switch mt-3">
                  <input class="form-check-input" type="checkbox" id="switch${cityID}">
                  <label class="form-check-label" for="switch${cityID}">Besökt</label>
                </div>
                <button class="btn btn-secondary mt-3">Läs mer</button>
              </div>
            </div>
          </div>
          `
          );
          displayImg(cityName);
          toggleVisitedCity(cityID);
          addCityToLS(cityID);
        });
      }
      root.insertAdjacentHTML('beforeend', '</div>');
    }
  });
};

const displayImg = (cityName) => {
  let img = document.getElementById(cityName);
  getImg(cityName).then((data) => {
    img.src = data.urls.regular;
  });
};
