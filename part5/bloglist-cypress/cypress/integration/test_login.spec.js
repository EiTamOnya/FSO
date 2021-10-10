describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

  })

  it('Login form is shown', function () {
    cy.visit('127.0.0.1:3000')
    cy.get('form').should('contain.text', 'Log in to application')
    cy.get('#username').should('exist')
    cy.get('#password').should('exist')
    cy.get('button').should('have.text', 'login')
  })
})