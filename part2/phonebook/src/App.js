import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Services from './services/requests'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchVal, setSearchVal] = useState('')

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
        ).then((newPerson) => {
          const newPersons = persons
            .filter((person) => person.name !== newPerson.name)
            .concat(newPerson)
          setPersons(newPersons)
        })
      }
    } else {
      Services.createNewPerson(personObject).then((newPerson) =>
        setPersons(persons.concat(newPerson))
      )
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
      Services.deletePerson(person.id).then(() => {
        const newPersons = persons.filter((p) => p.id !== person.id)
        setPersons(newPersons)
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
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
