describe('Blog app', function () {
  const user = {
    name: 'Test user',
    username: 'testuser',
    password: 'testpass'
  }

  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('127.0.0.1:3000')
  })

  it('Login form is shown', function () {
    cy.get('form').should('contain.text', 'Log in to application')
    cy.get('#username').should('exist')
    cy.get('#password').should('exist')
    cy.get('button').should('have.text', 'login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type(user.username)
      cy.get('#password').type(user.password)
      cy.get('button').click()
      cy.get('p').should('have.text', `${user.name} logged-in`)
    })
    it('fails with wrong credentials', function () {
      cy.get('#username').type('wrong')
      cy.get('#password').type('wrong')
      cy.get('button').click()
      cy.get('.error').should('have.text', 'invalid username or password')
    })
  })
  describe('When logged in', function () {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3003/api/login', {
        username: user.username, password: user.password
      }).then(response => {
        localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
      })
      cy.visit('127.0.0.1:3000')
    })

    it.only('A blog can be created', function () {
      cy.get('button').contains('new blog').click();
      cy.get('#title').type('Test title')
      cy.get('[name="author"]').type('Test author')
      cy.get('[name="url"]').type('test.com')
      cy.get('button').contains('submit').click()
      cy.get('.notification').should('have.text', 'A new blog Test title, by Test author added!')
      cy.get('.title').should('contain.text', 'Test title')
    })
  })
})