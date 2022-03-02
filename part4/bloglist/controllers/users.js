const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response, next) => {
  const users = await User.find({})
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  if (
    !request.body.username ||
    !request.body.password ||
    request.body.username.length < 3 ||
    request.body.password.length < 3
  ) {
    response.status(403).json({
      error: 'username or password undefined or less than 3 chars length',
    })
  } else {
    const { name, username, password } = request.body
    const users = await User.find({})
    const usernames = users.map((user) => user.username)
    if (usernames.includes(username)) {
      response.status(403).json({ error: 'username already exist' })
    } else {
      const rounds = 10
      const passwordHash = await bcrypt.hash(password, rounds)
      const user = new User({
        username,
        name,
        passwordHash,
      })
      const savedUser = await user.save()
      response.status(201).json(savedUser)
    }
  }
})

module.exports = usersRouter
