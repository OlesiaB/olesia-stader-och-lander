import { getData } from './fetch.mjs';

export const displayCountries = () => {
  getData().then((data) => {
    console.log('JSON data', data);
    const countryMenu = document.getElementById('country-menu');

    data[0].forEach((country) => {
      countryMenu.insertAdjacentHTML(
        'beforeend',
        `<li class="nav-item dropdown">
        <a
          class="nav-link dropdown-toggle"
          href="#"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
        ${country.countryname}
        </a>
        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">`
      );

      data[1].forEach((city) => {
        if (city.countryid == country.id) {
          const allDropdownElements = document.querySelectorAll(
            '.dropdown-menu'
          );
          const lastDropDownElement =
            allDropdownElements[allDropdownElements.length - 1];

          lastDropDownElement.insertAdjacentHTML(
            'beforeend',
            `<li id="${city.id}"><a class="dropdown-item" href="#">${city.stadname}</a></li>`
          );
        }
      });
      countryMenu.insertAdjacentHTML('beforeend', `</ul>`);
    });
  });
};
