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
      //Unlike cy.request that yields the response as an object containing properties such as:status body headers duration"
      //cy.wait does NOT yield a response object, thus the .should(response) or .then (response) pattern that would have worked great with cy.request fails here 
      //Doc says: "cy.wait() yields an object containing the HTTP request and response PROPERTIES of the request"
      //Which I believe means is "destruction assignment":
      //"If your object being passed in mirrors the variable being referenced, you can retrieve that specific field during assignment."
      // https://stackoverflow.com/questions/4146984/curly-braces-inside-javascript-arguments-for-functions
      //So, I'd need to wrap the object "property" in curly braces like this: { response }
      
      cy.wait('@getComment')
        .then(({ response }) => {
          expect(response.statusCode).to.eq(200)
          cy.log(response)
        })

      // Alternate option is to use .its pattern which is not my favorite. It's a little too much abstration imho.
      // cy.wait('@getComment')
      //   .its('response.statusCode')
      //   .should('be.oneOf', [200, 304])
    })
})
 