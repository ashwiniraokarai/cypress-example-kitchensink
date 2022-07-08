context("stub or mock network response", () => {
    
    before("set fake response data in a before hook", () => {
        cy.fixture("example").then(function(data) {
            this.data = data
            //cy.log("Data saved in 'this'", this.data)
        })
        
    })

    it("intercepts both the network request and response", function () {
        cy.visit('/commands/network-requests')

        //response is being set to data read and saved from the fixture file in before hook
        cy.intercept('GET', '**/comments/*', this.data).as('getComment')
        
        cy.get('.btn-primary').click()

        cy.wait('@getComment')
          .its('response.statusCode')
          .should('be.oneOf', [200, 304])
    })
})