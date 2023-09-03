import { useEffect, useState } from 'react'
import './App.css'
import { WeatherService } from './services/weatherService';
import { Weather } from './components/Weather';
import { LocationsList } from './components/LocationsList';

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
  const handleGetWeather = async (weatherWithCountry) => {
    const newWeather = await WeatherService.getWeatherByLocation(weatherWithCountry ?? listOfLocations[0].name);
    setWeather(newWeather);
    setShowListOfLocations(false);
  }

  const handlePressEnter = (e) => {
    if (e.key === 'Enter') {
      handleGetWeather();
    }
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
          <LocationsList listOfLocations={listOfLocations} handleGetWeather={handleGetWeather} />
        )
      }
      {
        noSuchLocation && (
          <span className='main-no-location'>No hay coincidencias con "{iptLocation}"</span>
        )
      }
      {
        weather && (
          <Weather weather={weather} handleSelectDay={handleSelectDay} />
        )
      }
    </div>
  )
}

export default App
