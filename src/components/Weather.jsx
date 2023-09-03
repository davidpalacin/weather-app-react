export const Weather = ({ weather, handleSelectDay }) => {
  return (
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