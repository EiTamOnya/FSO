const commentsRouter = require('express').Router()
const Comment = require('../models/comment')
const Blog = require('../models/blog')

commentsRouter.post('/:id/comments', async (request, response, next) => {
  const body = request.body
  const blog = await Blog.findById(request.params.id)

  const comment = new Comment({
    text: body.text,
    blog: blog._id
  })
  try {
    const savedComment = await comment.save()
    blog.comments = blog.comments.concat(savedComment._id)
    await blog.save()
    response.json(savedComment)
  } catch (exception) {
    next(exception)
  }
})

module.exports = commentsRouter
