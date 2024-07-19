import axios from 'axios';

const API_KEY = '333f5f76f462f672c26750a2003bab0c';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const fetchCurrentWeather = (city) => {
  return axios.get(`${BASE_URL}/weather`, {
    params: {
      q: city,
      appid: API_KEY,
      units: 'metric'
    }
  });
};

export const fetchWeatherForecast = (city) => {
  return axios.get(`${BASE_URL}/forecast`, {
    params: {
      q: city,
      appid: API_KEY,
      units: 'metric'
    }
  });
};
