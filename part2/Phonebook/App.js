import { useState } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

const Persons = ({persons}) => {
  console.log("pp", persons)
  return (
    <div>
      {persons.map(person =>
        <div key={person.name}>{person.name} {person.number}</div>
      )}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')

  const findByName = (name) => {
    if (name === '') {
      return persons
    }
    let len = name.length
    let finded = []
    persons.forEach(element => {
      // 字符串截取
      let saveName = element.name.toLowerCase().substring(0, len)
      if (name === saveName) {
        console.log("finded", element.name)
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
