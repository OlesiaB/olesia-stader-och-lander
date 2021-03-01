import { getData } from './fetch.mjs';

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
          flexContainer.insertAdjacentHTML(
            'beforeend',
            `
          <div class="col-sm-3">
            <div class="card mb-3">
              <div class="card-body">
                <h5 class="card-title">${cityData.stadname}</h5>
                <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
              </div>
            </div>
          </div>
          `
          );
        });
      }
      root.insertAdjacentHTML('beforeend', '</div>');
    }
  });
};
