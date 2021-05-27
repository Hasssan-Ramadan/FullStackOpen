import React from 'react'

const Persons = ({ persons, searchVal, handleClick }) => {
  return (
    <React.Fragment>
      {persons
        .filter((person) => {
          return person.name.toLowerCase().includes(searchVal.toLowerCase())
        })
        .map((person) => {
          return (
            <p key={person.name}>
              {person.name} {person.number}
              <button onClick={() => handleClick(person)}>delete</button>
            </p>
          )
        })}
    </React.Fragment>
  )
}

export default Persons
