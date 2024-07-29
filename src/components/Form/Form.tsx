import { ChangeEvent, useState, FormEvent} from "react";
import { countries } from "../../data/countries";
import styles from './Form.module.css'
import { SearchType } from "../../types";
import Alert from "../Alert/Alert";

type FormProps = {
  fetchWeather: (search: SearchType) => Promise<void>
}

const Form = ({fetchWeather} : FormProps) => {

  const [search, setSearch] = useState<SearchType>({
    city: '',
    country: ''
  })

  const [alert, setAlert] = useState<string>('')

  const handleChange = (e: ChangeEvent <HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => 
    {
      setSearch({
        ...search,
        [e.target.name] : e.target.value
      })
    }

    const handleSumit = ( e: FormEvent<HTMLFormElement> ) => {
      e.preventDefault()

      if(Object.values(search).includes('')) {
        setAlert('Todos los campos son obligatorios')
        return
      }
      fetchWeather(search)
    }

  return (
    <form 
    className={styles.form}
    onSubmit={handleSumit}>
      {alert && <Alert>{alert}</Alert>}
      <div className={styles.field}>
        <label htmlFor="city">Ciudad:</label>
        <input className={styles.inputCity}
          id="city"
          type="text"
          name="city"
          placeholder="ciudad"
          value={search.city}
          onChange={handleChange}>
        </input>
      </div>

      <div className={styles.field}>
        <label htmlFor="country">Pais:</label>
        <select
          id="country"
          value={search.country}
          name="country"
          onChange={handleChange}>
          <option value="">--Seleccione un pais--</option>
          {countries.map(country => (
            <option className={styles.option}
              key={country.code}
              value={country.code}>
              {country.name}
            </option>
          ))}
        </select>
      </div>
      <input className={styles.submit} type="submit" value='Consultar clima' />
    </form>
  ) 
}

export default Form

