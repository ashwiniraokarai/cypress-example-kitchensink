const { defineConfig } = require('cypress')

module.exports = defineConfig({
  'projectId': '4b7344',
  e2e: {
    //baseUrl: "https://example.cypress.io"
    baseUrl: "http://localhost:8080" //want CI to test against local server
  },
  env: {
    navBarText: "cypress.io"
  }
})
