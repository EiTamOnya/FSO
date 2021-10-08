const bcrypt = require('bcrypt')
const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)

const User = require('../models/user')

beforeEach(async () => {
  await User.deleteMany({})
  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', passwordHash })

  await user.save()
})

describe('verify invalid operations', () => {
  test('try to create a user with short password', async () => {
    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'sal',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect({ 'error': 'password too short' })
  })

  test('try to create a user with an existing username', async () => {
    const newUser = {
      username: 'root',
      name: 'Matti Luukkainen',
      password: 'sal1',
    }

    const response = await api
      .post('/api/users')
      .send(newUser)

    expect(response.status).toBe(400)
    expect(response.error.text).toContain('User validation failed')
  })

})
afterAll(() => {
  mongoose.connection.close()
})