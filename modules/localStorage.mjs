export const addCityToLS = (cityID) => {
  const buttonToggle = document.getElementById('flexSwitchCheckDefault');
  buttonToggle.addEventListener('change', () => {
    // Check if there are any cities saved in LS
    let visitedCities = JSON.parse(localStorage.getItem('visitedCities'));
    if (buttonToggle.checked == true) {
      visitedCities.push(cityID);
      localStorage.setItem('visitedCities', JSON.stringify(visitedCities));
    } else if (buttonToggle.checked == false) {
      let cityToDelete = visitedCities.indexOf(cityID);
      visitedCities.splice(cityToDelete, 1);
      localStorage.setItem('visitedCities', JSON.stringify(visitedCities));
    }
  });
};

export const toggleVisitedCity = (cityID) => {
  if (!localStorage.getItem('visitedCities')) {
    localStorage.setItem('visitedCities', JSON.stringify([]));
  } else {
    let visitedCities = JSON.parse(localStorage.getItem('visitedCities'));
    if (visitedCities.includes(cityID)) {
      const buttonToggle = document.getElementById('flexSwitchCheckDefault');
      buttonToggle.checked = true;
    }
  }
};
