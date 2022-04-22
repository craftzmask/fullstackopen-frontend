import { useEffect, useState } from 'react'
import axios from 'axios'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [query, setQuery] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
      .then(response => setPersons(response.data))
  }, [])

  const personsToShow = persons.filter(person => {
    const name = person.name.toLowerCase()
    return name.includes(query.toLowerCase())
  })

  const handleSubmitClick = event => {
    event.preventDefault()
    
    const foundPerson = persons
      .find(person => person.name === newName)

    if (foundPerson) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      }
      setNewName('')
      setPersons(persons.concat(personObject))
    }
  }

  const handleNameChange = event => {
    setNewName(event.target.value)
  }

  const handleNumberChange = event => {
    setNewNumber(event.target.value)
  }

  const handleQueryChange = event => {
    setQuery(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        query={query}
        handleQueryChange={handleQueryChange} 
      />

      <h3>Add a new</h3>
      <PersonForm 
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        onSubmit={handleSubmitClick}
      />

      <h2>Numbers</h2>
      <Persons persons={personsToShow} />
    </div>
  )
}

export default App