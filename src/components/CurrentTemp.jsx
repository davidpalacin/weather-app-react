export const CurrentTemp = ({ weather }) => {
  return (
    <div className="current-temp-container">
      <h3>En tiempo real:</h3>
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
    </div>
  )
}