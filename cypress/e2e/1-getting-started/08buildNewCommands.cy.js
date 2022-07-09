
//Custom commands are a great way to abstract (“tuck”) away setup (specific to your app) in its own file
//Custom commands are set in support>commands.js file - the default place where cypress looks for any custom commands

context("set and get token value from commands.js", () => {
    it("sets token in local storage by calling pre-written commands", () => {
        //set token by calling custom command setLocalStorage
        cy.setLocalStorage('token', 'abcd123')

        //get previously set token ^^ by calling custom command getLocalStorage
        cy.getLocalStorage('token')
         .should('eq', 'abcd123')
    })      
})
