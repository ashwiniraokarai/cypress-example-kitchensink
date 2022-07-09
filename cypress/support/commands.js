// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

//Added by Ash as per https://github.com/testing-library/cypress-testing-library
import '@testing-library/cypress/add-commands'

//ADD custom cy command (a.k.a reusable block of code to store frequently needed lines of code)
//set token (key-value pairs) in browser local storage 
Cypress.Commands.add('setLocalStorage', (key, value) => {
    cy.window().then((window) => {
        window.localStorage.setItem(key, value)
    })
})

//ADD another custom cy command to:
//get token (value based on key) from browser local storage
Cypress.Commands.add('getLocalStorage', (key) => {
    cy.window().then((window) => {
      return window.localStorage.getItem(key)
    })
})

//OVERWRITE a default cy command
//