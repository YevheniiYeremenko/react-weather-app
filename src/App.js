import React, { useState, useEffect } from "react";
import {
  fetchCurrentWeather,
  fetchWeatherForecast,
} from "./services/weatherService";
import { WeatherSearch } from "./components/WeatherSearch";
import { WeatherDisplay } from "./components/WeatherDisplay";
import { WeatherForecast } from "./components/WeatherForecast";

function App() {
  const dirArray = ["Clear", "Clouds", "Rain"];
  const [city, setCity] = useState("");
  const [weatherDir, setWeatherDir] = useState(
    dirArray[Math.floor(Math.random() * dirArray.length)]
  );
  const [backgroundImg, setBackgroundImg] = useState("");
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const randomBackground = () => {
    let randImg = Math.floor(Math.random() * 7);
    setBackgroundImg(`./backgrounds/${weatherDir}/${randImg}.jpg`);
  };

  const handleSearch = async () => {
    const weatherResponse = await fetchCurrentWeather(city);
    setWeatherDir(weatherResponse.data.weather[0].main);
    setCurrentWeather(weatherResponse.data);
    const forecastResponse = await fetchWeatherForecast(city);
    setForecast(forecastResponse.data);
  };

  useEffect(() => {
    randomBackground(); // Викликаємо randomBackground при завантаженні сторінки
  }, [currentWeather]);

  useEffect(() => {
    if (city) {
      handleSearch();
    }
  }, [city]);

  return (
    <main>
      <div
        className="fixed bg-sky-100 brightness-[.4] h-screen w-screen"
        style={{
          backgroundImage: `url(${backgroundImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <div
        className={
          "absolute inset-0 z-10 py-4 px-4 min-h-screen w-full flex flex-col items-center gap-4 lg:gap-0 container mx-auto " + (!currentWeather || !forecast ? "justify-center" : "")
        }
      >
        <WeatherSearch onSearch={setCity} />
        {currentWeather && forecast && (
          <div className="flex flex-col w-full">
            <WeatherDisplay weather={currentWeather} />
            <WeatherForecast forecast={forecast} />
          </div>
        )}
      </div>
    </main>
  );
}

export default App;
