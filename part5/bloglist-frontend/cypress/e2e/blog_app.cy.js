describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users', {
      name: 'Hassan Ramadan',
      username: 'RmdanJr',
      password: 'RmdanJrPass',
    })
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.get('#login-form').contains('username')
    cy.get('#login-form').contains('password')
    cy.get('#login-form').contains('login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username-input').type('RmdanJr')
      cy.get('#password-input').type('RmdanJrPass')
      cy.get('#login-btn').click()
      cy.contains('Hassan Ramadan logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username-input').type('RmdanJr')
      cy.get('#password-input').type('Pass')
      cy.get('#login-btn').click()
      cy.contains('Hassan Ramadan logged in').should('not.exist')
      cy.get('#notification').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3003/api/login', {
        username: 'RmdanJr',
        password: 'RmdanJrPass',
      }).then((res) => {
        localStorage.setItem('loggedBlogappUser', JSON.stringify(res.body))
        cy.visit('http://localhost:3000')
      })
    })

    it('A blog can be created', function () {
      cy.contains('add blog').click()
      cy.get('#blog-form').contains('Title').find('input').type('new title')
      cy.get('#blog-form').contains('Author').find('input').type('new author')
      cy.get('#blog-form').contains('Url').find('input').type('new url')
      cy.get('#blog-form').contains('add').click()
      cy.get('#blog-list').contains('new title')
      cy.get('#blog-list').contains('new author')
      cy.get('#blog-list').contains('new url')
    })
  })
})
