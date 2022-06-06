import axios from 'axios'
const openWeatherService ={
    async getCoordinates (city) {
        try {
            const data = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=69848b2b9d85b90ece44f25bfa99d3a0`)
            return [data.data, null]
        } catch (error) {
            return [null, error]
        }
    }
}
export default openWeatherService