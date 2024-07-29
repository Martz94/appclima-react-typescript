import { Weather } from "../../hooks/useWeather"
import formatTemperature from "../../utils"
import styles from './Weathers.module.css'

type WeathersProps = {
    weather: Weather
}

function Weathers({weather}: WeathersProps) {
  return (
    <div className={styles.container}>
      <h1>EL clima de: {weather.name}</h1>
      <p className={styles.current}>Actual: { formatTemperature( weather.main.temp)}&deg;C</p>
      <div className={styles.temperature}>
        <p>Minima: <span>{ formatTemperature( weather.main.temp_min)}&deg;C</span></p>
        <p>Maxima: <span>{ formatTemperature( weather.main.temp_max)}&deg;C</span></p>
      </div>
    </div>
  )
}

export default Weathers
