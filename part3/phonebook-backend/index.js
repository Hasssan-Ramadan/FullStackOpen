require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

app.use(express.json())

const Person = require('./models/person')

morgan.token('content', (req, res) => {
  return JSON.stringify(req.body)
})
app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :content'
  )
)
app.use(cors())
app.use(express.static('build'))

app.get('/info', (request, response) => {
  Person.find({})
    .then((persons) => {
      response.end(
        `Phonebook has info for ${persons.length} people.\n\n${Date()}`
      )
    })
    .catch((error) => {
      response.json({ error: error.message })
    })
})

app.get('/api/persons', (request, response) => {
  Person.find({})
    .then((persons) => {
      return response.json(persons)
    })
    .catch((error) => {
      response.json({ error: error.message })
    })
})

app.post('/api/persons/', (request, response) => {
  const body = request.body

  if (body.name == undefined || body.number == undefined) {
    return response.status(400).json({ error: 'content missing' })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person
    .save()
    .then((savedPerson) => {
      response.json(savedPerson)
    })
    .catch((error) => {
      response.json({ error: error.message })
    })
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id)
    .then((person) => {
      response.json(person)
    })
    .catch((error) => {
      response.json({ error: error.message })
    })
})

app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndDelete(request.params.id)
    .then((person) => {
      return response.status(204).end()
    })
    .catch((error) => {
      response.json({ error: error.message })
    })
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
