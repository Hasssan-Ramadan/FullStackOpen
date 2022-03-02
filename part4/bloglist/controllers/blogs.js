const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate(
    'user',
    ('user', { username: 1, name: 1, id: 1 })
  )
  response.json(blogs.map((blog) => blog.toJSON()))
})

blogsRouter.post('/', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
  const body = request.body
  if (!body.title && !body.url) {
    return response.status(400).json({
      error: 'url or title is missing',
    })
  } else if (!body.likes) {
    body.likes = 0
  }
  const newBlog = new Blog({
    ...body,
    user: user._id,
  })
  const savedBlog = await newBlog.save()
  response.json(savedBlog)
  user.blogs = user.blogs.concat(newBlog._id)
  await user.save()
})

blogsRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const userId = decodedToken.id
  const blog = await Blog.findById(request.params.id)
  if (blog.user.toString() === userId.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else {
    response
      .status(403)
      .json({ error: 'user has no permission to delete the blog' })
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const blog = await Blog.findByIdAndUpdate(request.params.id, request.body, {
    new: true,
  })
  if (blog) {
    response.status(204).json(blog)
  } else {
    response.status(404).end()
  }
})

module.exports = blogsRouter
