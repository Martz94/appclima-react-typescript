import styles from "./App.module.css"
import Form from "./components/Form/Form"
import Spin from "./components/Spinner/Spin"
import Weathers from "./components/Weathers/Weathers"
import useWeather from "./hooks/useWeather"
import Alert from "./components/Alert/Alert"

function App() {
  
  const { weather, fetchWeather, hasWeatherData, loading, notFound} = useWeather ()
  return (
    <>
      <h1 className={styles.title}>Consultar clima ahora</h1>
      <div className={styles.container}>
        <Form fetchWeather={fetchWeather}></Form>
        {loading && <Spin></Spin>}
        {hasWeatherData &&
        <Weathers weather={weather}></Weathers>}
        {notFound && <Alert>Ciudad no encontrada</Alert>}
      </div>
    </>
  )
}

export default App
