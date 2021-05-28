import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import Services from './services/requests'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchVal, setSearchVal] = useState('')
  const [message, setMessage] = useState('')
  const [CssClass, setCssClass] = useState('')

  useEffect(
    () => Services.getAllPersons().then((persons) => setPersons(persons)),
    []
  )

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }
    const personsNames = persons.map((person) => person.name)
    if (personsNames.includes(personObject.name)) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace old number with the new one?`
        )
      ) {
        Services.updatePerson(
          persons.filter((person) => person.name === newName)[0].id,
          personObject
        )
          .then((newPerson) => {
            const newPersons = persons
              .filter((person) => person.name !== newPerson.name)
              .concat(newPerson)
            setPersons(newPersons)
          })
          .then(() => {
            setMessage('Old number updated with the new one successfully!')
            setCssClass('success')
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
          .catch((error) => {
            setMessage(
              `Information of ${newName} has already been removed from the server.`
            )
            setCssClass('fail')
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
      }
    } else {
      Services.createNewPerson(personObject)
        .then((newPerson) => setPersons(persons.concat(newPerson)))
        .then(() => {
          setMessage(`${personObject.name} has been added successfully!`)
          setCssClass('success')
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch((error) => {
          setMessage(`Something went wrong while adding ${personObject.name}`)
          setCssClass('fail')
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
    }
    setNewName('')
    setNewNumber('')
  }
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleValChange = (event) => {
    setSearchVal(event.target.value)
  }

  const handleClick = (person) => {
    if (window.confirm(`Do you really want to delete ${person.name}?`)) {
      Services.deletePerson(person.id)
        .then(() => {
          const newPersons = persons.filter((p) => p.id !== person.id)
          setPersons(newPersons)
        })
        .then(() => {
          setMessage(`${person.name} has been deleted successfully!`)
          setCssClass('success')
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch((error) => {
          setMessage(
            `Information of ${person.name} has already been removed from the server.`
          )
          setCssClass('fail')
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} CssClass={CssClass} />
      <Filter searchVal={searchVal} handleValChange={handleValChange} />
      <h2>Add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        searchVal={searchVal}
        handleClick={handleClick}
      />
    </div>
  )
}

export default App
