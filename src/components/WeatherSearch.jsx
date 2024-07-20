import React, { useState, useEffect } from "react";

export function WeatherSearch({ onSearch }) {
  const [city, setCity] = useState("");
  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSearch = () => {
    setCity("")
    onSearch(city);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 max-w-xs md:max-w-full">
      <input
        type="text"
        className="font-bold text-3xl border-0 border-b-2 py-2 border-white text-center text-white bg-transparent placeholder:text-white placeholder:font-light focus:outline-none focus:border-sky-100"
        placeholder="Enter city name"
        value={city}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
      />
      <button
        className="text-white text-xl py-2 px-6 bg-transparent font-light border rounded border-white focus:outline-none hover:border-sky-100 hover:text-sky-100"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
}
