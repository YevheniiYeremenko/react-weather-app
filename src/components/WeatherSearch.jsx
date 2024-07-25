import React, { useState, useEffect } from "react";

export function WeatherSearch({ onSearch }) {
  const [city, setCity] = useState("");
  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSearch = () => {
    setCity("");
    onSearch(city.trim());
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex md:flex-row gap-4 max-w-full md:max-w-full">
      <input
        type="text"
        className="w-10/12 text-3xl border-b py-1 border-white text-center text-white bg-transparent placeholder:text-gray-400 placeholder:font-light focus:outline-none focus:border-sky-100"
        placeholder="Enter city name"
        value={city}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
      />
      <button
        className="text-white text-xl px-4 md:px-6 bg-transparent font-light border rounded border-white focus:outline-none lg:hover:border-sky-100 lg:hover:text-sky-100"
        onClick={handleSearch}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="md:hidden w-6 fill-white"
          viewBox="0 0 24 24"
        >
          <path d="M10 2a8 8 0 1 0 5.3 14.7l5.4 5.4 1.4-1.4-5.4-5.4A8 8 0 0 0 10 2zm0 2a6 6 0 1 1 0 12A6 6 0 0 1 10 4z" />
        </svg>
        <span className="hidden md:block">Search</span>
      </button>
    </div>
  );
}
