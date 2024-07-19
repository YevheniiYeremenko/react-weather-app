import React, { useState, useEffect } from "react";

export function WeatherSearch({ onSearch }) {
  const [city, setCity] = useState("");
  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSearch = () => {
    onSearch(city);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <input
        type="text"
        className="border-0 border-b-4 py-2 border-sky-600 text-xl bg-transparent focus:outline-none focus:border-sky-500"
        placeholder="Enter city name"
        value={city}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
      />
      <button
        className="bg-sky-600 hover:bg-sky-500 text-white rounded px-6 text-xl py-2"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
}
