const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log(
    'Please provide the password as an argument: node mongo.js <password>'
  )
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://rmdanjr:${password}@cluster0.qy9q8.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url)

const phoneSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Phone = mongoose.model('Phone', phoneSchema)

if (process.argv.length >= 5) {
  const phone = new Phone({
    name: process.argv[3],
    number: process.argv[4],
  })

  phone.save().then((phone) => {
    console.log(`added ${phone.name} number ${phone.number} to phonebook`)
    mongoose.connection.close()
  })
} else {
  console.log("phonebook:")
  Phone.find({}).then((phonebook) => {
    phonebook.forEach((phone) => {
      console.log(`${phone.name} ${phone.number}`)
    })
    mongoose.connection.close()
  })
}
