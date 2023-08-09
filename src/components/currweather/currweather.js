import "./currweather.css";

// Define the CurrWeather component
const CurrWeather = ({ data }) => {
    // Render the weather information using the provided data
  return (
    <div className="weather">
      <div className="left">
        <div>
          <p className="city">{data.city}</p>
          <p className="desc">{data.weather[0].description}</p>
          <h2 className="temp">{Math.round(data.main.temp)} °C</h2>
          {/*<img
              alt="weather"
              className="weather-icon"
              src={`icons/${data.weather[0].icon}.png`}
            />*/}
        </div>
      </div>
      <div className="right">
        <div className="details">
          <div>
            <p className="det-label">Feels like:</p>
            <p className="det-row">{Math.round(data.main.feels_like)}°C</p>
            <p className="det-label">Humidity:</p>
            <p className="det-row">{data.main.humidity}%</p>
            <p className="det-label">Wind:</p>
            <p className="det-row">{data.wind.speed} m/s</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrWeather;
