require('express-async-errors')
const { MONGODB_URL } = require('./utils/config')
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const app = express()

mongoose.connect(MONGODB_URL)

const middleware = require('./utils/middleware')
app.use(middleware.tokenExtractor)

app.use(cors())
app.use(express.json())

app.use('/api/blogs', middleware.userExtractor, blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

module.exports = app
