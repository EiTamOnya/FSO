const Blog = require('../models/blog')
const User = require('../models/user')

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

const initialUser = {
  username: 'root',
  name: 'Superuser',
  password: 'salainen',
  passwordHash: '$2b$10$9IJ1DxFOPrtlrvKMRXASZOyUdCRvxw92rnQ1HAsvEm100btENzZTO'
}

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

const userInDb = async () => {
  return await User.findOne({})
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb, initialUser, userInDb
}