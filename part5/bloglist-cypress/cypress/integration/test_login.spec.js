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
})