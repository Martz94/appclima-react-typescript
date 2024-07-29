import axios from 'axios'
import {z} from 'zod'
import { SearchType } from '../types'
import { useMemo, useState } from 'react'


//zod
const Weather = z.object({
    name: z.string(),
    main: z.object({
      temp: z.number(),
      temp_max: z.number(),
      temp_min: z.number()
    })
})
export type Weather = z.infer<typeof Weather>

const initialState = {
  name: '',
      main: {
        temp: 0,
        temp_max: 0,
        temp_min: 0
   }
} 

function useWeather() {

    const [weather, setWeather] = useState<Weather>(initialState)
    const [loading, setLoading] = useState(false)
    const [notFound, setNotfound] = useState(false)

    const fetchWeather =async(search: SearchType) => { 
        const appId = import.meta.env.VITE_API_KEY
        setLoading(true)
        setWeather(initialState)
        try {
            const geoURL = `https://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appId}`

            const {data} = await axios(geoURL)

             if(!data[0]){
              setNotfound(true)
              return
             }

            const lat = data[0].lat
            const lon = data[0].lon
            
            const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`

           const {data: weatheResult} = await axios(weatherURL)
            const result = Weather.safeParse(weatheResult)
            if(result.success) {
              setWeather(result.data)
            }
        } catch (error) {
            console.log(error)
        } finally {
          setLoading(false)
        }
    }

    const hasWeatherData = useMemo ( () => weather.name , [weather])

  return {
    weather,
    loading,
    notFound,
    fetchWeather,
    hasWeatherData
  }
}

export default useWeather