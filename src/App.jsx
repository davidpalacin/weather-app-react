import { useEffect, useState } from 'react'
import './App.css'
import { WeatherService } from './services/weatherService';
import.meta.env.WEATHER_API;

function App() {
  const [weather, setWeather] = useState(null);
  const [noSuchLocation, setNoSuchLocation] = useState(false);
  const [listOfLocations, setListOfLocations] = useState([]);
  const [showListOfLocations, setShowListOfLocations] = useState(true);
  const [iptLocation, setIptLocation] = useState('');
  const [selectedDay, setSelectedDay] = useState('today'); // ?

  useEffect(() => {
    if (listOfLocations.length === 0) {
      setNoSuchLocation(true);
      return;
    }
    setShowListOfLocations(true);
  }, [listOfLocations])

  // Called function when the user types something in the input
  const handleLocationSearch = async (e) => {
    const value = e.target.value;
    if (value.trim() === '') {
      setNoSuchLocation(false);
      return
    }
    const newLocations = await WeatherService.getAutocompleteLocations(e.target.value);
    setNoSuchLocation(false);
    setListOfLocations(newLocations);
    setShowListOfLocations(true);
    setIptLocation(value);
  }

  // Function that get the weather of a location with the first item in the array of locations
  const handleGetWeather = async () => {
    const newWeather = await WeatherService.getWeatherByLocation(listOfLocations[0].name);
    setWeather(newWeather);
    setShowListOfLocations(false);
  }

  const handlePressEnter = (e) => {
    if (e.key === 'Enter') {
      handleGetWeather();
    }
  }

  // Get the weather of a location of an exact country
  const handleGetWeatherOfSelectedCountry = async (locationName, locationCountry) => {
    const newWeather = await WeatherService.getWeatherByLocation(`${locationName} ${locationCountry}`);
    if (!newWeather) return;
    setWeather(newWeather);
    setShowListOfLocations(false);
  }

  const handleSelectDay = (e) => {
    const newSelectedDay = e.target.value;
    setSelectedDay(newSelectedDay); // ?
  }

  return (
    <div className='main'>
      <header>
        <h2 className='main-title'>Weather App</h2>
        <section className="main-search">
          <input
            placeholder='Busca tu ubicación'
            onChange={handleLocationSearch}
            onKeyDown={handlePressEnter} type="text"
          />
          <button onClick={handleGetWeather}>Ver</button>
        </section>
      </header>
      {
        listOfLocations.length > 0 &&
        showListOfLocations && (
          <section className='main-list'>
            <ul className='main-list-locations'>
              {
                listOfLocations.map((loc) => (
                  <li
                    onClick={() => handleGetWeatherOfSelectedCountry(loc.name, loc.country)}
                    key={loc.id}
                  >
                    {loc.name} ({loc.country})
                  </li>
                ))
              }
            </ul>
          </section>
        )
      }
      {
        noSuchLocation && (
          <span className='main-no-location'>No hay coincidencias con "{iptLocation}"</span>
        )
      }
      {
        weather && (
          <>
            <h3 className='main-weatherTitle'>El tiempo en {weather.location.name} ({weather.location.country})</h3>
            <nav className="main-bar">
              <option onClick={handleSelectDay} value={'today'}>Hoy</option>
              <option onClick={handleSelectDay} value={'tomorrow'}>Mañana</option>
              <option onClick={handleSelectDay} value={'forecast'}>Prox. 7 días</option>
            </nav>
            <section className='main-weather'>
              <section className="main-weather-info">
                <h3>{weather.current.temp_c}ºC</h3>
                <span>
                  Sensación térmica: {weather.current.feelslike_c}º
                </span>
              </section>
              <section className="main-weather-icon">
                <img width={100} src={weather.current.condition.icon} alt="Icono que representa el clima de hoy" />
                <h3>{weather.current.condition.text}</h3>
              </section>
            </section>
          </>

        )
      }
    </div>
  )
}

export default App
