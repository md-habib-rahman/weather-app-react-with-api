import React, { useState } from "react";

const App = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const apiKey = import.meta.env.VITE_apiKey;

  const fetchWeather = async () => {
    if (!city) return;
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      const data = await res.json();
      if (data.cod === 200) {
        setWeather({
          name: data.name,
          country: data.sys.country,
          temp: data.main.temp,
          description: data.weather[0].description,
          humidity: data.main.humidity,
          wind: data.wind.speed,
          icon: data.weather[0].icon,
        });
      } else {
        alert("city not found");
        setWeather(null);
      }
    } catch (err) {
      console.log(err);
      alert("Error fetching weather");
    }
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="font-bold text-3xl mt-8 ">React Weather App 🌤️</h2>
      <div className="mb-4">
        <input
		className="h-10 border-gray-300 border rounded-2xl mr-10 pl-4 mt-4"
          type="text"
          placeholder="Enter City Name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button className="bg-gray-400 border border-amber-400 rounded-2xl px-4 h-10 text-white" onClick={fetchWeather}>Search</button>
      </div>
      {weather && (
        <div className="bg-gray-200 rounded-xl p-4">
          <h3 className="font-bold">
            {weather.name}, {weather.country}
          </h3>
          <p>{weather.description}</p>
          <p>🌡️ {weather.temp}</p>
          <p>💧 Humidity: {weather.humidity}%</p>
          <p>💨 Wind: {weather.wind} m/s</p>
          <img
            src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}
            alt={weather.description}
          />
        </div>
      )}
    </div>
  );
};

export default App;
