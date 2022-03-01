const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({})
    response.json(blogs)
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.post('/', async (request, response, next) => {
  try {
    if (!request.body.likes) request.body.likes = 0
    if (!request.body.url && !request.body.title) {
      response.status(400).end()
    } else {
      const blog = new Blog(request.body)
      const result = await blog.save()
      response.status(201).json(result)
    }
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogsRouter
