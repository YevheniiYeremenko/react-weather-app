import React from "react";

export function WeatherDisplay({ weather }) {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const {
    name,
    main,
    weather: weatherDetails,
    wind,
    sys,
    dt,
    timezone,
  } = weather;
  const temperature = main.temp;
  const description = weatherDetails[0].description;
  const time = new Date((dt + timezone) * 1000);
  const day = daysOfWeek[time.getUTCDay()];
  const windSpeed = wind.speed;
  const country = sys.country;
  const allIconsPath = "./icons/all/";

  const dateToHhMm = (date) => {
    const time = new Date((date + timezone) * 1000);
    const hours = time.getUTCHours().toString().padStart(2, "0");
    const minutes = time.getUTCMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const weatherData = [
    {
      value: Math.floor(windSpeed),
      unit: "m/s",
      icon: allIconsPath + "windsock.svg",
      extraClass: "text-4xl",
    },
    {
      value: main.humidity,
      unit: "%",
      icon: allIconsPath + "humidity.svg",
      extraClass: "text-4xl",
    },
    {
      value: Math.floor(main.pressure),
      unit: "mmhg",
      icon:
        allIconsPath + (main.pressure >= 760
          ? "pressure-high.svg"
          : "pressure-low.svg"),
      extraClass: "text-4xl col-span-2",
    },
    {
      value: Math.floor(main.temp_max),
      unit: "°C",
      icon: allIconsPath + "thermometer-warmer.svg",
      extraClass: "text-4xl",
    },
    {
      value: Math.floor(main.temp_min),
      unit: "°C",
      icon: allIconsPath + "thermometer-colder.svg",
      extraClass: "text-4xl",
    },
    {
      value: dateToHhMm(sys.sunrise),
      unit: "",
      icon: allIconsPath + "sunrise.svg",
      extraClass: "text-4xl lg:text-2xl xl:text-4xl",
    },
    {
      value: dateToHhMm(sys.sunset),
      unit: "",
      icon: allIconsPath + "sunset.svg",
      extraClass: "text-4xl lg:text-2xl xl:text-4xl",
    },
  ];

  return (
    <div className="p-4 rounded-xl h-fit text-white flex-1 font-light">
      <p className="text-6xl">
        {name}, {country}
      </p>
      <div className="flex mt-2">
        <p className="uppercase flex-1">{description}</p>
        <p>
          {day}, {dateToHhMm(dt)}
        </p>
      </div>
      <div className="flex flex-row items-center my-5 border-y border-white/30">
        <div className="flex-1">
          <img
            src={`./icons/openweathermap/${weatherDetails[0].icon}.svg`}
            className="w-64"
            alt=""
          />
        </div>
        <div className="flex-1 text-center">
          <p className="text-7xl xl:text-8xl font-bold">
            <img
              src="./icons/all/thermometer.svg"
              alt=""
              className="inline w-24 -mt-2 -mx-6"
            />
            {Math.floor(temperature)}
            <span className="text-3xl align-top">°C</span>
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 grid-flow-row auto-rows-max gap-2">
        {weatherData.map((item, index) => (
          <div
            key={index}
            className={`h-full flex items-center justify-center ${item.extraClass}`}
          >
            <p className="bg-white/10 py-2 rounded text-center w-full flex items-center justify-center">
              {item.value}
              <span className="text-lg mt-4">{item.unit}</span>
              <img src={item.icon} alt="" className="w-12 inline pt-2 -mx-1" />
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
