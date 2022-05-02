import { useEffect, useState } from 'react'

import personService from './services/persons'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [query, setQuery] = useState('')
  const [message, setMessage] = useState(null)
  const [typeMessage, setTypeMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, [])

  const personsToShow = persons.filter(person => {
    const name = person.name.toLowerCase()
    return name.includes(query.toLowerCase())
  })

  const createMessage = (message, type) => {
    setMessage(message)
    setTypeMessage(type)

    setTimeout(() => {
      setMessage(null)
      setTypeMessage(null)
    }, 5000)
  }

  const handleSubmitClick = event => {
    event.preventDefault()
    
    const foundPerson = persons
      .find(person => person.name === newName)

    const personObject = {
      name: newName,
      number: newNumber,
    }

    if (foundPerson) {
      const result = window.confirm(
        `${personObject.name} is already added to phonebook, replace the old number with a new one?`
      )

      if (result) {
        personService.update(foundPerson.id, personObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => {
              return person.id !== foundPerson.id 
                ? person : returnedPerson
            }))
            createMessage(`Updated ${returnedPerson.name}'s number`, 'success')
          })
          .catch(error => {
            setPersons(persons.filter(person => person.id !== foundPerson.id))
            createMessage(
              `Information of ${foundPerson.name} has already been removed from server`,
              'error'
            )
          })
      }

    } else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          createMessage(`Added ${returnedPerson.name}`, 'success')
        })
        .catch(error => createMessage(error.response.data.error, 'error'))
    }
  }

  const handleDeleteClick = personObject => {
    const result = window.confirm(`Delete ${personObject.name}`)
    if (result) {
      personService.remove(personObject.id)
      setPersons(persons.filter(person => person.id !== personObject.id))
      createMessage(`Deleted ${personObject.name}`)
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

      <Notification message={message} type={typeMessage} />

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