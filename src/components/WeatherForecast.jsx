import React, { useState } from "react";

export function WeatherForecast({ forecast }) {
  const [displayType, setDisplayType] = useState("hourly");
  const isHourly = displayType === "hourly";
  const dataToDisplay = isHourly
    ? forecast.list.slice(0, 9)
    : forecast.list.filter((_, index) => index % 8 === 0).slice(0, 5);

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return (
    <div className="text-white">
      <div className="text-center my-6 text-lg">
        <div className="border border-white rounded-full inline-block">
          <button
            className={
              "w-32 sm:w-40 lg;28 py-1 rounded-s-full lg:hover:bg-white/10 border-e border-white " +
              (displayType === "hourly" ? "text-sky-100" : "")
            }
            onClick={() => setDisplayType("hourly")}
          >
            24 Hours
          </button>
          <button
            className={
              "w-32 sm:w-40 lg;28 py-1 rounded-e-full lg:hover:bg-white/10 border-s border-white " +
              (displayType !== "hourly" ? "text-sky-100" : "")
            }
            onClick={() => setDisplayType("daily")}
          >
            5 Days
          </button>
        </div>
      </div>
      <div
        className={
          "h-fit font-light flex-1 grid grid-cols-1 grid-flow-row auto-rows-max gap-2 " +
          (displayType === "hourly"
            ? "md:grid-cols-3 lg:grid-cols-9"
            : "lg:grid-cols-5")
        }
      >
        {dataToDisplay.map((item, index) => {
          const date = new Date(item.dt * 1000);
          const hours = date.getUTCHours().toString().padStart(2, "0");
          const day = daysOfWeek[date.getUTCDay()];

          return (
            <div
              key={index}
              className="rounded bg-white/10 h-full flex lg:flex-col items-center justify-around p-0 lg:p-2"
            >
              <p className="text-xl">{isHourly ? `${hours}:00` : day}</p>
              <img
                src={`./icons/openweathermap/${item.weather[0].icon}.svg`}
                className="w-24 -my-1 lg:-my-2"
                alt={item.weather[0].main}
              />
              <p className="text-4xl lg:text-2xl">
                {Math.floor(item.main.temp)}
                <span className="text-lg align-top">°C</span>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
