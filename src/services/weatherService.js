import axios from "axios";

export const WeatherService = {}

WeatherService.getWeatherByLocation = async (location) => {
  const result = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_WEATHER_API}&q=${location}&aqi=no
`);
  return result.data;
}

WeatherService.getAutocompleteLocations = async (value) => {
  const result = await axios.get(`http://api.weatherapi.com/v1/search.json?key=0a945511d26249ca8a4141626232808&q=${value}`);
  return result.data;
}

