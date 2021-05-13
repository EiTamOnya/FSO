import React, { useState } from 'react'

const Name = ({ name }) => {
  return (
    <div>{name}</div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    const person = { name: newName }
    persons.some(entry => entry.name === person.name)
      ? window.alert(`${newName} is already added to phone book!`)
      : setPersons(persons.concat(person))
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>debug: {newName}</div>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person =>
        <Name key={person.name} name={person.name} />
      )}
    </div>
  )
}

export default App