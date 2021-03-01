// Fetch data from the JSON files

export const getData = () =>
  Promise.all([
    fetch('./JSON/land.json').then((response) => response.json()),
    fetch('./JSON/stad.json').then((response) => response.json()),
  ]);

// Fetch data from the Wikipedia API
export const getInfo = async (cityName) => {
  let response = await fetch(
    `https://sv.wikipedia.org/api/rest_v1/page/summary/${cityName}`
  );
  let data = await response.json();
  return data;
};

// Fetch data from Unspash API
const myKey = 'gFhWo81L2mDhbwPpGFOM7693XsVdwV0fA_LkpdLDlfQ';
export const getImg = async (cityName) => {
  let response = await fetch(
    `https://api.unsplash.com/photos/random?page=1&query=${cityName}&client_id=${myKey}&orientation=landscape`
  );
  let data = await response.json();
  return data;
};

// Fetch data from the weather API
const myWeatherKey = '1ca3747656b008e306fdaefc8fbdee49';
export const getWeatherData = async (cityName) => {
  let response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${myWeatherKey}&units=metric&lang=sv`
  );
  let data = await response.json();
  return data;
};
