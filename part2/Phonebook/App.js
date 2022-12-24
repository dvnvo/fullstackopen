import { useState, useEffect } from 'react'
import axios from 'axios'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personService from './services/persons'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='error'>
      {message}
    </div>
  )
}

const Persons = ({persons, setPersons, setFindedPerson}) => {
  const handleDelete = (id) => {
    const deletePerson = persons.filter(p => p.id === id)
    const name = deletePerson[0].name
    if (window.confirm(`Delete ${name}`)) {
      personService
      .deletePerson(id)
      .then(response => {
        setPersons(persons.filter(p => p.id !== id))
        setFindedPerson(persons.filter(p => p.id !== id))
      })      
    }
  }

  return (
    <div>
      {persons.map(person =>
        <div key={person.id}>
          <div key={person.name}>
            {person.name} {person.number}
            <button onClick={() => handleDelete(person.id)}>delete</button>
          </div>
        </div>
      )}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [findedPerson, setFindedPerson] = useState([])
  const [errorMessage, setErrorMessage] = useState('')


  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then((response) => {
        const personList = response.data
        setPersons(personList)
        setFindedPerson(personList)
      })
  }, [])

  const findByName = (name) => {
    let len = name.length
    let finded = []
    persons.forEach(element => {
      let saveName = element.name.toLowerCase().substring(0, len)
      if (name.toLowerCase() === saveName) {
        finded.push(element)
      }
    });
    return finded
  }

  const handleSearchChange = (event) => {
    let n = event.target.value
    setSearchName(n)
    const finded = n ? findByName(n) : persons
    setFindedPerson(finded)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />

      <Filter 
        searchName={searchName}
        handleSearchChange={handleSearchChange}
      />
      
      <h2>add a new</h2>
      <PersonForm
        persons={persons}
        newName={newName}
        newNumber={newNumber}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        setPersons={setPersons}
        setFindedPerson={setFindedPerson}
        setErrorMessage={setErrorMessage}
      />

      <h2>Numbers</h2>
      <Persons 
        persons={findedPerson}
        setPersons={setPersons}
        setFindedPerson={setFindedPerson}
      />
    </div>
  )
}

export default App