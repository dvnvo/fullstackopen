const mongoose = require('mongoose')
const dataName = 'personApp'

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://test:${password}@cluster0.fekrece.mongodb.net/${dataName}?retryWrites=true&w=majority`

//

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const nameInput = process.argv[3]
const numberInput = process.argv[4]

if (nameInput && numberInput) {
  const person = new Person({
    name: nameInput,
    number: numberInput,
  })

  person.save().then(result => {
    const msg = `added ${nameInput} number ${numberInput} to phonebook`
    console.log(msg)
    mongoose.connection.close()
  })
} else {
  console.log('phonebook: ')
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
}
