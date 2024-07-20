import React, { useState, useEffect } from "react";
import {
  fetchCurrentWeather,
  fetchWeatherForecast,
} from "./services/weatherService";
import { WeatherSearch } from "./components/WeatherSearch";
import { WeatherDisplay } from "./components/WeatherDisplay";

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
    console.log(`${weatherDir}/${randImg}`);
  };

  const handleSearch = async () => {
    const weatherResponse = await fetchCurrentWeather(city);
    await setWeatherDir(weatherResponse.data.weather[0].main);
    console.log(weatherResponse.data.weather[0].main);
    console.log(weatherDir);
    setCurrentWeather(weatherResponse.data);
    console.log(weatherResponse.data);
    const forecastResponse = await fetchWeatherForecast(city);
    setForecast(forecastResponse.data);
  };

  useEffect(() => {
    randomBackground(); // Викликаємо randomBackground при завантаженні сторінки
  }, [weatherDir]);

  useEffect(() => {
    if (city) {
      handleSearch();
    }
  }, [city]);

  return (
    <main>
      <div
        className="fixed bg-sky-100 brightness-50 h-screen w-screen"
        style={{
          backgroundImage: `url(${backgroundImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <div
        className={
          "absolute inset-0 z-10 py-4 min-h-screen w-full flex flex-col items-center lg:justify-center gap-10 container mx-auto"
        }
      >
        <WeatherSearch onSearch={setCity} />
        {currentWeather && (
          <div className="flex flex-col md:flex-row gap-x-10 w-full">
            <WeatherDisplay weather={currentWeather} />
          </div>
        )}
      </div>
    </main>
  );
}

export default App;
