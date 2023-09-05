import { useEffect } from "react"

export const ForecastTemp = ({ forecast }) => {
  return (
    <>
      <section className="forecast-temp-container">
        <h3>Temperatura media:</h3>
        <section className='main-weather'>
          <section className="main-weather-info">
            <h3>{forecast.day.avgtemp_c}ºC</h3>
          </section>
          <section className="main-weather-icon">
            <img width={100} src={forecast.day.condition.icon} alt="Icono que representa el clima de hoy" />
            <h3>{forecast.day.condition.text}</h3>
          </section>
        </section>
      </section>
    </>
  )
}