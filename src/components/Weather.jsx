import { useState, useEffect } from 'react'
import { CurrentTemp } from './CurrentTemp'
import { ForecastTemp } from './ForecastTemp'

export const Weather = ({ weather, handleSelectDay, actualLocation, forecast, selectedDay }) => {
  const [date, setDate] = useState(forecast.date);

  useEffect(() => {
    const newDate = new Date(forecast.date);
    const options = { weekday: 'long', month: 'long', day: 'numeric' }
    setDate(newDate.toLocaleDateString('es-ES', options))
  }, [forecast.date])

  return (
    <>
      <h3 className='main-weatherTitle'>El tiempo en {actualLocation}</h3>
      <nav className="main-bar">
        <option onClick={handleSelectDay} value={'today'}>Ahora</option>
        <option onClick={handleSelectDay} value={'tomorrow'}>Mañana</option>
      </nav>
      <div className="dayInfo">
        {date}
      </div>
      <section className="max-min-temps">
        <div className="max-temp">{forecast.day.maxtemp_c} 🔥</div>
        <div className="min-temp">{forecast.day.mintemp_c} ❄</div>
        <div className="rain-chance">{forecast.day.daily_chance_of_rain}% 🌧</div>
      </section>
      <div className="forecast-container">
        {
          selectedDay === 'today' && (
            <CurrentTemp weather={weather} />
          )
        }
        <ForecastTemp forecast={forecast} />
      </div>
    </>
  )
}