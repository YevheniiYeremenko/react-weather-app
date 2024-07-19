import React, { useState, useEffect } from "react";
import {
  fetchCurrentWeather,
  fetchWeatherForecast,
} from "./services/weatherService";
import { WeatherSearch } from "./components/WeatherSearch";

function App() {
  const [city, setCity] = useState("");
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleSearch = async () => {
    const weatherResponse = await fetchCurrentWeather(city);
    console.log(weatherResponse);
    setCurrentWeather(weatherResponse.data);
    const forecastResponse = await fetchWeatherForecast(city);
    setForecast(forecastResponse.data);
  };

  useEffect(() => {
    if (city) {
      handleSearch();
    }
  }, [city]);

  return (
    <div className="p-4 bg-cyan-100 min-h-screen flex items-center justify-center">
      <div className={!currentWeather || !forecast ? "" : ""}>
        <WeatherSearch onSearch={setCity} />
      </div>
    </div>
  );
}

export default App;
