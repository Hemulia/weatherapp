import "./App.css";
import React, { useState, useEffect } from "react";
import Search from "./components/search/search";
import CurrWeather from "./components/currweather/currweather";
import { WEATHER_API_KEY, WEATHER_API_URL } from "./api";
import Forecast from "./components/forecast/forecast";

// Define the main App component
function App() {
  // State to hold current weather data and forecast data
  const [currWeather, setCurrWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  // Effect to run when the component mounts
  useEffect(() => {
    // Get user's current location and fetch weather data
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        // Fetch weather data using user's location
        fetchWeatherData(latitude, longitude);
      },
      (error) => {
        console.log("Error getting location:", error);
      }
    );
  }, []); // Empty dependency array means this effect runs only once, on mount

  // Function to fetch weather data from the API using latitude and longitude
  const fetchWeatherData = (lat, lon) => {
    const currWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    // Fetch both current weather and forecast data in parallel
    Promise.all([currWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        // Update state with fetched data
        setCurrWeather({ city: weatherResponse.name, ...weatherResponse });
        setForecast({ city: weatherResponse.name, ...forecastResponse });
      })
      .catch((err) => console.log(err));
  };

  // Function to handle search input change
  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");
    // Fetch weather data using the provided latitude and longitude
    fetchWeatherData(lat, lon);
  };

  // JSX structure for the App component
  return (
    <div className="app">
      <div className="container">
        <div className="top">
          <div className="searchContainer">
            {/* Search component with the search change handler */}
            <Search className="search" onSearchChange={handleOnSearchChange} />
          </div>
          <div className="weatherContainer">
            <div className="currweather">
              {/* Display current weather component if data is available */}
              {currWeather && <CurrWeather data={currWeather} />}
            </div>
            <div className="forecast">
              {/* Display forecast component if data is available */}
              {forecast && <Forecast data={forecast} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
