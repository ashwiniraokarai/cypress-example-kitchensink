context("stub or mock a network request", () => {
    it("shows the real, non-fake workflow in kitchensink from a UI standpoint", () => {
        cy.visit("/commands/network-requests")
        cy.get('.btn-primary')
          .click()
        cy.get('.network-comment').should('contain.text', 'laudantium enim quasi est quidem magnam')

        //button click is wired to a GET request behind the scenes that will return/ fetch the comment
        //e.g. request: https://jsonplaceholder.cypress.io/comments/1
        //note that the resource can be any number comments/1, comments/2..comments/n
        //you can check this out in the browser network tab if you don't believe me :)
        
    })

    it("tests the real, non-fake API directly w/o UI involvement", () => {
      cy.request('GET', 'https://jsonplaceholder.cypress.io/comments/1')
        .should((response)=> {
          expect(response.status).to.eq(200)
        })
    })

    //now we combine the real UI workflow to trigger a FAKE API behind the scenes and assert!
    it("tests the real UI + FAKE network request via cy.intercept", () => {
      cy.visit("/commands/network-requests")

      //Clicking the button will naturally trigger the real API
      //Fake the network request BEFORE you perform the button click 
      //Use regex due to possible changing pieces in the url. Alias the request.
      cy.intercept('GET', '**/comments/*').as('getComment')

      cy.get('.btn-primary')
          .click()
    
      //wait for an aliased resource to resolve before moving on to the next command => less flake
      //https://docs.cypress.io/api/commands/wait
      //cy.wait does not yield a response object, thus the .should(response) code that would have worked great with cy.request fails here 
      //Doc says: "cy.wait() yields an object containing the HTTP request and response properties of the request"
      //whereas "cy.request() yields the response as an object literal containing properties such as:status body headers duration"

      // cy.wait('@getComment')
      //   .then((response) => {
      //     expect(response.statusCode).to.eq(200)
      //     cy.log(response)
      //   })

      cy.wait('@getComment')
        .its('response.statusCode')
        .should('be.oneOf', [200, 304])
    })
})
 