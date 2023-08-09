import "./forecast.css";
// Array of weekdays to display in the forecast
const weekdays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

// Define the Forecast component
const Forecast = ({ data }) => {
  // Get the current day of the week (0 for Sunday, 1 for Monday, and so on)
  const dayInTheWeek = new Date().getDay();
  // Reorder the weekdays array based on the current day
  const foredays = weekdays
    .slice(dayInTheWeek, 6)
    .concat(weekdays.slice(0, dayInTheWeek));

  return (
    <div className="forecast">
      {/* Title label for the forecast */}
      <label className="title">Forecast</label>
      <div className="days-container">
        {/* Create rows of forecast data */}
        {Array.from(
          { length: Math.ceil(foredays.length / 3) },
          (_, rowIndex) => (
            <div className="days-row" key={rowIndex}>
              {/* Map over the days in the current row */}
              {foredays
                .slice(rowIndex * 3, (rowIndex + 1) * 3)
                .map((day, idx) => {
                  const listItemIndex = idx + rowIndex * 3;
                  const forecastItem = data?.list?.[listItemIndex];

                  // If there's no forecast data for the current item, return null
                  if (!forecastItem) return null;

                  return (
                    <div className="day" key={idx}>
                      <div className="day-label-forecast">
                        {/* Display the day's label */}
                        <label className="day-label">{day}</label>
                        <div className="forecast-content">
                          <div className="forecastleft">
                            {/* Display weather description and temperature */}
                            <p className="foredesc">
                              {forecastItem.weather[0].description}
                            </p>
                            <p className="foretemp">
                              {Math.round(forecastItem.main.temp)}°C
                              <img
                                alt="weather"
                                className="weather-icon"
                                src={`icons/${forecastItem.weather[0].icon}.png`}
                              />
                            </p>
                          </div>
                          <div className="forecastright">
                            {/* Display "Feels like" temperature */}
                            <p className="foretop">Feels like:</p>
                            <p className="forebot">
                              {Math.round(forecastItem.main.feels_like)}°C
                            </p>
                            {/* Display humidity */}
                            <p className="foretop">Humidity:</p>
                            <p className="forebot">
                              {Math.round(forecastItem.main.humidity)}%
                            </p>
                            {/* Display wind speed */}
                            <p className="foretop">Wind:</p>
                            <p className="forebot">
                              {Math.round(forecastItem.wind.speed)}m/s
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Forecast;
