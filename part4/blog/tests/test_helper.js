const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Test',
    author: 'Test',
    url: 'tset.com',
    likes: 13
  },
  {
    title: 'Second',
    author: 'Two',
    url: 'test.com',
    likes: 24
  },
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon', authror: 'author', url: 'test.com', like: 3 })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}