import { useState, useEffect } from 'react'
import axios from 'axios'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

const Persons = ({persons}) => {
  return (
    <div>
      {persons.map(person =>
        <div key={person.name}>{person.name} {person.number}</div>
      )}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then((response) => {
        setPersons(response.data)
      })
  }, [])

  const findByName = (name) => {
    if (name === '') {
      return persons
    }
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
    findByName(n)
  }

  const findedPerson = findByName(searchName)

  return (
    <div>
      <h2>Phonebook</h2>
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
      />

      <h2>Numbers</h2>
      <Persons persons={findedPerson}/>
    </div>
  )
}

export default App