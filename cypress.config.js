const { defineConfig } = require('cypress')

module.exports = defineConfig({
  'projectId': '4b7344',
  e2e: {
    baseUrl: "https://example.cypress.io"
    //baseUrl: "http://localhost:8080"
  },
  env: {
    navBarText: "cypress.io"
  }
})
