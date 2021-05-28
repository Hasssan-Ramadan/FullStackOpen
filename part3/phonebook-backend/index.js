const { request } = require('express')
const express = require('express')
const app = express()

let persons = [
  {
    name: 'Arto Hellas',
    number: '040-123456',
    id: 1,
  },
  {
    name: 'Ada Lovelace',
    number: '39-44-5323523',
    id: 2,
  },
  {
    name: 'Dan Abramov',
    number: '12-43-234345',
    id: 3,
  },
  {
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
    id: 4,
  },
]

app.get('/api/persons', (request, response) => {
  return response.json(persons)
})

app.get('/info', (request, response) => {
  return response.end(
    `Phonebook has info for ${persons.length} people.\n\n${Date()}`
  )
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  if (id <= persons.length)
    return response.json(persons.find((person) => person.id === id))
  return response.status(404).end()
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter((person) => person.id !== id)

  return response.status(204).end()
})

app.use(express.json())

app.post('/api/persons/', (request, response) => {
  const person = request.body
  person.id = Math.floor(Math.random() * 100)
  persons = persons.concat(person)
  response.json(person)
})

const PORT = 3001

app.listen(PORT)
