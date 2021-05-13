import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Entry = ({ entry }) => {
  return (
    <div>{entry.name} {entry.number}</div>
  )
}

const Filter = ({ value, onChange }) => {
  return (
    <div>
      find countries <input value={value} onChange={onChange} />
    </div>
  )
}

const Countries = ({ countries }) => {

  if (countries.length < 10 && countries.length > 1) {
    return (
      countries.map(country =>
        <Entry key={country.name} entry={country} />
      )
    )
  }
  else if (countries.length === 1) {
    return (
      < Country country={countries[0]} />
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

  const filterCountries = () => {
    return countries.filter(entry => entry.name.toLowerCase().includes(newFilter.toLowerCase()))
  }

  console.log(countries)
  return (
    <div>
      < Filter value={newFilter} onChange={handleFilterChange} />
      <div>
        < Countries countries={filterCountries()} />
      </div>
    </div>
  )
}

export default App