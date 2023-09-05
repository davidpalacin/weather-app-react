import axios from "axios";

export const WeatherService = {}

// return the weather of today by location
WeatherService.getWeatherByLocation = async (location) => {
  const result = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_WEATHER_API}&q=${location}&lang=es
`);
  return result.data;
}

// return the list of locations that match the value
WeatherService.getAutocompleteLocations = async (value) => {
  const result = await axios.get(`https://api.weatherapi.com/v1/search.json?key=0a945511d26249ca8a4141626232808&q=${value}`);
  return result.data;
}

// return the forecast of given days (0-14) by location
WeatherService.getWeatherByLocationAndDay = async (location, day) => {
  const result = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_WEATHER_API}&q=${location}&days=${day}&lang=es`);
  return result.data;
}
