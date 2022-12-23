import { useState, useEffect } from "react";
import axios from "axios";

const Country = ({country}) => {
  const [weather, setWeather] = useState([])
  const languages = Object.values(country.languages)
  const langs = []
  for(var key in languages){
    langs.push(languages[key])
  }
  const capital = country.capital
  const api_key = process.env.REACT_APP_API_KEY
  useEffect(() => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`)
      .then((response) => {
        console.log("weather in---", response.data);
        const { temperature, weather_icons, wind_speed, wind_dir } = response.data.current
        setWeather({
          temperature,
          weather_icons,
          wind_speed,
          wind_dir
        })
      })
  }, [api_key, capital])

  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>capital {country.capital}</div>
      <div>area {country.area}</div>
      <h2>languages:</h2>
      {langs.map((language) => 
        <li>{language}</li>
      )}
      <img src={country.flags.png} alt="flag" />

      <h2>Weather in {country.capital}</h2>
      <div>temperature: {weather.temperature} Celcius</div>
      <img src={weather.weather_icons} alt="weather" />
      <div>wind: {weather.wind_speed} mph direction {weather.wind_dir}</div>
    </div>
  )
}

export default Country
