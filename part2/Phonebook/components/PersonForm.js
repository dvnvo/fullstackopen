import React from 'react'

const PersonForm = (props) => {
  const {
    persons,
    newName,
    newNumber,
    setNewName,
    setNewNumber,
    setPersons,
  } = props

  const equalSavedName = (name) => {
    console.log("equal", name)
    persons.forEach(element => {
      if (name === element.name) {
        let m = `${name} is already added to phonebook`
        alert(m)
      }
    });
  }
  const addPerson = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const person = {
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(person))
    setNewName('')
    setNewNumber('')
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