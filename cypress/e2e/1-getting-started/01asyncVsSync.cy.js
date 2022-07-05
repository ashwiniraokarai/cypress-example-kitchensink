
context("an example of async", () => {
    beforeEach("Visit the page", () => {
        cy.visit("/commands/actions")
    })

    //If you notice the browser console, you'll see that the console.log messages before the 5ms wait time!
    //Takeaway: Cypress commands run in sync or in order they appears whereas plain ol js lines run async
    it("types into an email field and logs without waiting for cy.wait", () => {
        cy.findByPlaceholderText("Email").type('testasync@email.com')
        cy.wait(5000)
        //non-js code
        console.log("async test has finished")
    })
})

context("the sync or more deterministic version - handling promise", () => {
    beforeEach("Visit the page", () => {
        cy.visit("/commands/actions")
    })

    it("types into an email field and logs only after cy.wait runs", () => {
        cy.findAllByPlaceholderText("Email").type('testsync@email.com')
        cy.wait(5000).then(() => {
            console.log("sync test has finished")
        })
    })
})

context("a more sophisticated example with non-cypress fetch api call", () => {
    beforeEach("Visit the page", () => {
        cy.visit("/commands/actions")
    })

    it("types into an email field and logs only after cy.wait runs", () => {
        cy.findAllByPlaceholderText("Email").type('testsync@email.com')
        cy.wait(2000).then(() => {
            console.log("api call is made after wait is completed")
            //reference: https://www.digitalocean.com/community/tutorials/how-to-use-the-javascript-fetch-api-to-get-data
            //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises
            //https://docs.spacexdata.com/#9211ff07-9f81-41ac-9568-3018dd043e2a
            fetch("https://api.spacexdata.com/v3/missions") 
                .then((response) => {return response.json()})
                .then((data) => {return console.log(data)})
        })
    })
})