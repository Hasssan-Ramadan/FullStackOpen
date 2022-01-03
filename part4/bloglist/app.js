const { MONGODB_URL } = require('./utils/config')
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const blogsRouter = require('./controllers/blogs')

const app = express()

mongoose.connect(MONGODB_URL)

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)

module.exports = app
