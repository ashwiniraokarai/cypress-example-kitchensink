const { defineConfig } = require('cypress')

module.exports = defineConfig({
  'projectId': '4b7344',
  e2e: {
    baseUrl: "https://example.cypress.io" //when I don't want to start up the local server
    //baseUrl: "http://localhost:8080" //when I want to start up the local server
  },
  env: {
    navBarText: "cypress.io"
  }
})
