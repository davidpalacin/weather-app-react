export const LocationsList = ({ listOfLocations, handleGetWeather }) => {
  return (
    <section className='main-list'>
      <ul className='main-list-locations'>
        {
          listOfLocations.map((loc) => (
            <li
              onClick={() => handleGetWeather(loc.name + ' ' + loc.country)}
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