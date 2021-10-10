describe('Blog app', function () {
  const user = {
    name: 'Test user',
    username: 'testuser',
    password: 'testpass'
  }

  const blogs = [{
    title: 'existing title',
    author: 'existing author',
    url: 'existing.com',
    likes: 50
  },
  {
    title: 'Test title',
    author: 'Test author',
    url: 'test.com',
    likes: 13
  },
  {
    title: 'Test title2',
    author: 'Test author2',
    url: 'test2.com',
    likes: 47
  },
  ]

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
        const headers = { Authorization: `bearer ${response.body.token}` }
        for (let blog of blogs) {
          cy.request({
            method: 'POST', url: 'http://localhost:3003/api/blogs/', body: blog, headers: headers
          })
        }
        cy.visit('127.0.0.1:3000')
      })
    })

    it('A blog can be created', function () {
      cy.get('button').contains('new blog').click();
      cy.get('#title').type(blogs[1].title)
      cy.get('[name="author"]').type(blogs[1].author)
      cy.get('[name="url"]').type(blogs[1].url)
      cy.get('button').contains('submit').click()
      cy.get('.notification').should('have.text', `A new blog ${blogs[1].title}, by ${blogs[1].author} added!`)
      cy.get('.title').should('contain.text', blogs[1].title)
    })

    it('A blog can be liked', function () {
      // wait for the test blog to be created
      cy.wait(1000)
      cy.get('button').contains('view').eq(0).click()
      cy.get('button').contains('like').click()
      cy.get('.notification').should('have.text', `Blog ${blogs[0].title}, by ${blogs[0].author} liked!`)
      cy.get('.likes').should('contain.text', 'likes: 1')
    })

    it('A blog can be deleted', function () {
      // wait for the test blog to be created
      cy.wait(1000)
      cy.get('button').contains('view').eq(0).click()
      cy.get('button').contains('remove').click()
      cy.get('.notification').should('have.text', `Blog ${blogs[0].title}, by ${blogs[0].author} deleted!`)
      cy.get('.title').contains(blogs[0].title).should('not.exist')
    })
    it.only('Blogs are ordered by likes', function () {
      // wait for the test blog to be created
      cy.wait(1000)
      cy.get('.likes-number').then((likes) => {
        const likeNumbersArray = likes.toArray().map(el => el.innerText)
        expect(likeNumbersArray).to.equal(likeNumbersArray.sort().reverse())
      })
    })
  })
})