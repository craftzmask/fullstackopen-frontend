import { useEffect, useState } from 'react'

import personService from './services/persons'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [query, setQuery] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, [])

  const personsToShow = persons.filter(person => {
    const name = person.name.toLowerCase()
    return name.includes(query.toLowerCase())
  })

  const handleSubmitClick = event => {
    event.preventDefault()
    
    const foundPerson = persons
      .find(person => person.name === newName)

    const personObject = {
      name: newName,
      number: newNumber,
    }

    if (foundPerson) {
      const prompt = `${personObject.name} is already added to phonebook, replace the old number with a new one?`
      const result = window.confirm(prompt)

      if (result) {
        personService.update(foundPerson.id, personObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => {
              return person.id !== foundPerson.id 
                ? person : returnedPerson
            }))
          })
      }

    } else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const handleDeleteClick = personObject => {
    const result = window.confirm(`Delete ${personObject.name}`)
    if (result) {
      personService.remove(personObject.id)
      setPersons(persons.filter(person => person.id !== personObject.id))
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
      <Persons 
        persons={personsToShow}
        handleDeleteClick={handleDeleteClick}
      />
    </div>
  )
}

export default App