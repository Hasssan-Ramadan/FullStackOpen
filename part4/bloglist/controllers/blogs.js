const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response, next) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
  if (!request.body.likes) request.body.likes = 0
  if (!request.body.url && !request.body.title) {
    response.status(400).end()
  } else {
    const blog = new Blog(request.body)
    const result = await blog.save()
    response.status(201).json(result)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response, next) => {
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
