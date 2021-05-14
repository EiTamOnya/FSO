import React, { useState, useEffect } from 'react'
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY

const Entry = ({ entry }) => {
  return (
    <>
      {entry.name}
    </>
  )
}

const Button = ({ onClick, text, value }) => {
  return (
    <button onClick={onClick} value={value}>{text}</button>
  )
}

const Filter = ({ value, onChange }) => {
  return (
    <div>
      find countries <input value={value} onChange={onChange} />
    </div>
  )
}

const Countries = ({ countries, onClick }) => {

  if (countries.length < 10 && countries.length > 1) {
    return (
      countries.map(country =>
        <div key={country.name}>
          <Entry entry={country} />
          <Button onClick={onClick} text="show" value={country.name} />
        </div>
      )
    )
  }
  else if (countries.length === 1) {
    return (
      <div>
        < Country country={countries[0]} />
        <Weather capital={countries[0].capital} />
      </div>
    )
  }
  else {
    return (<div>Too many matches, specift another filter</div>)
  }

}

const Country = ({ country }) => {
  return (
    <div>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h3>languages</h3>
      <ul>
        {country.languages.map(language =>
          <li key={language.name}>{language.name}</li>
        )}
      </ul>
      <img src={country.flag} alt={`${country.name} flag`} width="100" />
    </div>
  )
}

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState('')
  useEffect(() => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`)
      .then(response => {
        setWeather(response.data.current)
        console.log(response.data)
      })
  }, [capital, setWeather])

  return (
    <div>
      <h2>Weather in {capital}</h2>
      <p><b>temperature:</b> {weather.temperature} Celcius</p>
      <img src={weather.weather_icons} alt="weather icon" width="100"></img>
      <p><b>wind:</b> {weather.wind_speed} direction {weather.wind_dir}</p>
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])



  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const buttonShow = (event) => {
    setNewFilter(event.target.value)
  }

  const filterCountries = () => {
    return countries.filter(entry => entry.name.toLowerCase().includes(newFilter.toLowerCase()))
  }

  return (
    <div>
      < Filter value={newFilter} onChange={handleFilterChange} />
      <div>
        < Countries countries={filterCountries()} onClick={buttonShow} />
      </div>
    </div>
  )
}

export default App