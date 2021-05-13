import React, { useState } from 'react'

const Entry = ({ person }) => {
  return (
    <div>{person.name} {person.number}</div>
  )
}

const People = ({ persons }) => {
  return (
    persons.map(person =>
      <Entry key={person.name} person={person} />
    )
  )
}

const Filter = ({ value, onChange }) => {
  return (
    <div>
      filter shown with: <input value={value} onChange={onChange} />
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const person = { name: newName, number: newNumber }
    persons.some(entry => entry.name === person.name)
      ? window.alert(`${newName} is already added to phone book!`)
      : setPersons(persons.concat(person))
    setNewName('')
    setNewNumber('')
  }

  const fitlerPeople = () => {
    return persons.filter(entry => entry.name.toLowerCase().includes(newFilter.toLowerCase()))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      < Filter value={newFilter} onChange={handleFilterChange} />
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
          <div>
            number: <input value={newNumber} onChange={handleNumberChange} />
          </div>
        </div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      < People persons={fitlerPeople()} />
    </div>

  )
}

export default App