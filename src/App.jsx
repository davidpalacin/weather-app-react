import { useEffect, useState } from 'react'
import './App.css'
import { WeatherService } from './services/weatherService';
import { Weather } from './components/Weather';
import { LocationsList } from './components/LocationsList';
import { DAYS } from '../types.js'

function App() {
  const [weather, setWeather] = useState(null);
  const [noSuchLocation, setNoSuchLocation] = useState(false);
  const [listOfLocations, setListOfLocations] = useState([]);
  const [showListOfLocations, setShowListOfLocations] = useState(true);
  const [iptLocation, setIptLocation] = useState('');
  const [selectedDay, setSelectedDay] = useState('today'); // The select day by the user to show the weather
  const [actualLocation, setActualLocation] = useState(''); // We save the actual selected location for swapping the days without losing it
  const [forecast, setForecast] = useState({});

  useEffect(() => {
    if (listOfLocations.length === 0) {
      setNoSuchLocation(true);
      return;
    }
    setShowListOfLocations(true);
  }, [listOfLocations])

  useEffect(() => {
    // Need weather variable with content to can change the day, if not we get out of the function.
    if (!weather) return;
    if (selectedDay === DAYS.TODAY) {
      // Use the API to get today's weather
      WeatherService.getWeatherByLocation(actualLocation)
        .then(newWeather => {
          // We set the new weather
          setWeather(newWeather);
          setForecast(newWeather.forecast.forecastday[0]);
        })
        .catch(err => {
          console.log(err)
        })
    }
    if (selectedDay === DAYS.TOMORROW) {
      // Save the forecast of tomorrow to show the max temp and min temp forecast.
      WeatherService.getWeatherByLocationAndDay(actualLocation, '2')
        .then(newWeather => {
          // We set the new weather
          setWeather(newWeather);
          setForecast(newWeather.forecast.forecastday[1]);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [selectedDay])

  // Use the API to get a list of locations that matches with the user input
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

  // Function that set the weather data
  const handleGetWeather = async (weatherWithCountry) => {
    // If we get the country use it, if not, get the weather of the first location
    const newWeather = await WeatherService.getWeatherByLocation(
      weatherWithCountry ??
      `${listOfLocations[0].name} (${listOfLocations[0].country})`
    );
    setWeather(newWeather);
    setForecast(newWeather.forecast.forecastday[0]);
    setShowListOfLocations(false);
    setActualLocation(weatherWithCountry ?? `${listOfLocations[0].name} (${listOfLocations[0].country})`);
  }


  const handlePressEnter = (e) => {
    if (e.key === 'Enter') {
      handleGetWeather();
    }
  }

  const handleSelectDay = (e) => {
    const newSelectedDay = e.target.value;
    setSelectedDay(newSelectedDay);
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
          <Weather forecast={forecast} weather={weather} handleSelectDay={handleSelectDay} actualLocation={actualLocation} selectedDay={selectedDay} />
        )
      }
    </div>
  )
}

export default App
