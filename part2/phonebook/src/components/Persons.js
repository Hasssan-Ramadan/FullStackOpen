import React from "react";

const Persons = ({ persons, searchVal }) => {
  return (
    <>
      {persons
        .filter((person) => {
          return person.name.toLowerCase().includes(searchVal.toLowerCase());
        })
        .map((person) => {
          return (
            <p key={person.name}>
              {person.name} {person.number}
            </p>
          );
        })}
    </>
  );
};

export default Persons;
