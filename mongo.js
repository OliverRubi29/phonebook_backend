const mongoose = require('mongoose')
console.log(process.argv.length)
if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://db_user:${password}@cluster0.6id8e80.mongodb.net/phonebookApp?appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if(process.argv.length < 4) {
  console.log(`phonebook:`)
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
}

if(process.argv[3] && process.argv[4]) {
  const name = process.argv[3]
  const number = process.argv[4]
  const person = new Person({
    name,
    number
  })

  person.save().then(result => {
    console.log('person saved!')
    mongoose.connection.close()
  })

}

// const person = new Person({
//   name: 'Test',
//   number: "2313123",
// })

// person.save().then(result => {
//   console.log('person saved!')
//   mongoose.connection.close()
// })
