/* eslint-disable no-undef */
import userService from '../../src/services/users'

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
})
