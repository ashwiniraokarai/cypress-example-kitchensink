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

//Overwrite the default .type() command: in particular, change what data the Cypress log shows! 
Cypress.Commands.overwrite('type', (originalFn, element, text, options) => {
  if(options && options.sensitive){
    options.log = false
    Cypress.log({
      //customize the log via a bunch of key value pairs exposed to you
      //you can customize of the name of the command to show in the log. By default this is 'type'.
      name: 'type',
      //mask the password. By default this shows whatever text is entered, as is
      message: "*".repeat(text.length)
    })
  }

  //IMPORTANT: You gotta return the original function when overriding. Otherwise, the default "message" won't show in the log!
  return originalFn(element, text, options)
})

