import React from 'react'
import personService from '../services/persons'

const PersonForm = (props) => {
  const {
    persons,
    newName,
    newNumber,
    setNewName,
    setNewNumber,
    setPersons,
    setFindedPerson,
    setErrorMessage,
  } = props

  const equalSavedName = (name) => {
    persons.forEach(element => {
      if (name === element.name) {
        let m = `${name} is already added to phonebook`
        alert(m)
      }
    });
  }

  const updatePerson = (id, person) => {
    const name = person.name
    const msg = `${name} is already added to phonebook, replace the old number  with a new one?`
    if (window.confirm(msg)) {
      personService
        .update(id, person)
        .then(returnNewPerson => {
          const newPersons = persons.map(p => p.id !== id ? p : returnNewPerson)
          setFindedPerson(newPersons)
        })
        .then(() => {
          setErrorMessage(`Updated ${name}`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 3000)
  
        })
        .catch((error) => {
          setErrorMessage(
            `In formation of ${name} has already been removed from server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }
  }

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }
    const newInPersons = persons.find(p => p.name === newName)
    if (newInPersons) {
      updatePerson(newInPersons.id, newPerson)
    } else {
      personService
        .create(newPerson)
        .then(returnPerson => {
          const newPersons = persons.concat(returnPerson)
          setPersons(newPersons)
          setFindedPerson(newPersons)
          setNewName('')
          setNewNumber('')
        })
        .then(() => {
          setErrorMessage(`Added ${newName}`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 3000)
  
        })
    }
  }

  const handleNameChange = (event) => {
    let name = event.target.value
    equalSavedName(name)
    setNewName(name)
  }

  const handleNumberChange = (event) => {
    let n = event.target.value
    setNewNumber(n)
  }

  return (
    <form onSubmit={addPerson}>
      <div>
        name: 
        <input
          value={newName}
          onChange={handleNameChange}
        />
      </div>
      <div>
        number: 
        <input
          value={newNumber}
          onChange={handleNumberChange}
        />
      </div>        
      <div>
        <button type="submit">add</button>
      </div>
    </form>    
  )
}

export default PersonForm