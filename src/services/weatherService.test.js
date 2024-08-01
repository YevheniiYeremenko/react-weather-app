import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { fetchCurrentWeather, fetchWeatherForecast } from './weatherService';

let API_KEY = '333f5f76f462f672c26750a2003bab0c';
let BASE_URL = 'https://api.openweathermap.org/data/2.5';

describe('weatherService', () => {
  let mock;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.restore();
  });

  describe('fetchCurrentWeather', () => {
    it('should return weather data for a valid city', async () => {
      const city = 'London';
      const response = {
        weather: [{ description: 'clear sky' }],
        main: { temp: 20 },
      };

      mock.onGet(`${BASE_URL}/weather`, {
        params: {
          q: city,
          appid: API_KEY,
          units: 'metric',
        },
      }).reply(200, response);

      const result = await fetchCurrentWeather(city);

      expect(result.status).toBe(200);
      expect(result.data).toEqual(response);
    });

    it('should handle 404 error for an invalid city', async () => {
      const city = 'InvalidCity';

      mock.onGet(`${BASE_URL}/weather`, {
        params: {
          q: city,
          appid: API_KEY,
          units: 'metric',
        },
      }).reply(404);

      try {
        await fetchCurrentWeather(city);
      } catch (error) {
        expect(error.response.status).toBe(404);
      }
    });
  });

  describe('fetchWeatherForecast', () => {
    it('should return forecast data for a valid city', async () => {
      const city = 'London';
      const response = {
        list: [{ dt: 1605182400, main: { temp: 20 }, weather: [{ description: 'clear sky' }] }],
      };

      mock.onGet(`${BASE_URL}/forecast`, {
        params: {
          q: city,
          appid: API_KEY,
          units: 'metric',
        },
      }).reply(200, response);

      const result = await fetchWeatherForecast(city);

      expect(result.status).toBe(200);
      expect(result.data).toEqual(response);
    });

    it('should handle 404 error for an invalid city', async () => {
      const city = 'InvalidCity';

      mock.onGet(`${BASE_URL}/forecast`, {
        params: {
          q: city,
          appid: API_KEY,
          units: 'metric',
        },
      }).reply(404);

      try {
        await fetchWeatherForecast(city);
      } catch (error) {
        expect(error.response.status).toBe(404);
      }
    });
  });
});