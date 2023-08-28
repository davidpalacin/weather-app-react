import { useEffect, useState } from 'react'
import './App.css'
import { WeatherService } from './services/weatherService';
import.meta.env.WEATHER_API;

function App() {
  const [weather, setWeather] = useState(null);
  const [noSuchLocation, setNoSuchLocation] = useState(false);
  const [listOfLocations, setListOfLocations] = useState([]);
  const [showListOfLocations, setShowListOfLocations] = useState(true);
  const [actualLocation, setAcutualLocation] = useState('');

  useEffect(() => {
    console.log(weather)
  }, [weather])

  // Called function when the user types something in the input
  const handleLocationSearch = async (e) => {
    const value = e.target.value;
    if (value.length === 0) return;
    const locations = await WeatherService.getAutocompleteLocations(e.target.value);
    setNoSuchLocation(false);
    setListOfLocations(locations);
    setShowListOfLocations(true);

  }

  // Function that get the weather of a location with the first item in the array of locations
  const handleGetWeather = async () => {
    if (listOfLocations.length === 0) {
      setNoSuchLocation(true);
      setWeather(null);
      return;
    }
    const today = await WeatherService.getWeatherByLocation(listOfLocations[0].name);
    setWeather(today);
    setShowListOfLocations(false);
    setAcutualLocation(`${listOfLocations[0].name} (${listOfLocations[0].country})`);
  }

  const handlePressEnter = (e) => {
    if (e.key === 'Enter') {
      handleGetWeather();
    }
  }

  // Get the weather of a location of an exact country
  const handleGetWeatherOfSelectedCountry = async (locationName, locationCountry) => {
    const today = await WeatherService.getWeatherByLocation(`${locationName} ${locationCountry}`);
    if (!today) return;
    setWeather(today);
    setShowListOfLocations(false);
    setAcutualLocation(`${locationName} (${locationCountry})`)
  }

  return (
    <div className='main'>
      <h2>Weather App</h2>
      <input
        placeholder='Busca tu ubicación'
        onChange={handleLocationSearch}
        onKeyDown={handlePressEnter} type="text"
      />
      {
        listOfLocations.length > 0 && showListOfLocations && (
          <ul className='list-of-locations'>
            {
              listOfLocations.map((location) => (
                <li
                  onClick={() => handleGetWeatherOfSelectedCountry(location.name, location.country)}
                  key={location.id}
                >
                  {location.name} ({location.country})
                </li>
              ))
            }
          </ul>
        )
      }
      <button onClick={handleGetWeather}>Ver el tiempo de hoy</button>
      {
        weather && (
          <>
            <h2>{actualLocation}</h2>
            <img width={100} src={weather.current.condition.icon} alt="Icono que representa el clima de hoy" />
            <h3>{weather.current.temp_c}ºC (Sensación térmica: {weather.current.feelslike_c}ºC)</h3>
            <h3>{weather.current.condition.text}</h3>
          </>

        )
      }
      {
        noSuchLocation && (
          <h3>No se ha encontrado ninguna ubicación</h3>
        )
      }
    </div>
  )
}

export default App
