const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})


test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('Check the number of blog posts', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('the blog title is test', async () => {
  const response = await api.get('/api/blogs')

  const contents = response.body.map(r => r.title)
  expect(contents).toContain('Second')
})

test('verifies that a valid blog post can be added', async () => {
  const newBlog = {
    title: 'New Post',
    author: 'Me',
    url: 'test3.com',
    likes: 33
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const contents = blogsAtEnd.map(r => r.title)
  expect(contents).toContain('New Post')
})

test('blog post without title and url is not added', async () => {
  const newBlog = {
    author: 'author',
    likes: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

test('verifies the unique identifier property id', async () => {
  const blogsAtEnd = await helper.blogsInDb()
  for (let blog of blogsAtEnd) {
    expect(blog._id).toBeDefined()
  }
})

test('blog post without likes has 0 likes', async () => {
  const newBlog = {
    title: 'No likes',
    author: 'test author',
    url: 'test5.com',
  }

  const blog = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  expect(blog.body.likes).toEqual(0)
})

afterAll(() => {
  mongoose.connection.close()
})
