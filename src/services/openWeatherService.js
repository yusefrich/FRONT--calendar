import axios from 'axios'
const openWeatherService ={
    async getCoordinates (city) {
        try {
            const data = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${import.meta.env.VITE_OPEN_WEATHER_KEY}`)
            return [data.data, null]
        } catch (error) {
            return [null, error]
        }
    },
    async getWeather (lat, lon) {
        try {
            const data = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_OPEN_WEATHER_KEY}`)
            return [data.data, null]
        } catch (error) {
            return [null, error]
        }
    }
}
export default openWeatherService