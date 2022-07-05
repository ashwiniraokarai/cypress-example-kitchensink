import { waitFor } from "@testing-library/dom"

context("visit the root or home page", () => {
    beforeEach('visit the page', () => {
        cy.visit('/')
    })

    it("links to the Actions page when you click on Actions sub-menu item from an open Commands drop down menu", () => {
        //Open the Commands menu just like a user would, and then click the Action item
        cy.findAllByText('Commands').eq(0)
          .click()
        cy.get('ul .dropdown-menu').find('li').eq(2)
          .click()
        cy.url().should('include', "/commands/actions")
    })

    it("links to the Actions page when you force-click on Actions sub-menu item bypassing the Commands drop down menu", () => {
        //Don't open the Commands menu. Directly locate the Action item and click on it
        //cy.findAllByText('Actions').first().click()
        //But above commented code FAILS because "This element <a> is not visible because its parent <ul.dropdown-menu> has CSS property: display: none..
        //..Fix this problem, or use {force: true} to disable error checking.Learn more"

        cy.findAllByText('Actions').first()
          .click({force: true})
        cy.url().should('include', "/commands/actions")
    })

    it("links to the Actions page when you click on Actions link on the body of the page", () => {
        //Directly click on the Actions item on the body of the page w/o going through the nav bar
        cy.findAllByText('Actions').eq(1)
           .click()
        cy.url().should('include', "/commands/actions")
    })

    it("lets you type into an input field", () => {
        cy.visit('commands/actions')
        cy.findByPlaceholderText("Email").type("test@email.com")
          .should('have.value', "test@email.com")
    })

    it("lets you clear an input field", () => {
        cy.visit('commands/actions')
        cy.findByLabelText('Describe:')
          .type('Test Description')
          .should('have.value', 'Test Description')
          .clear()
          .should('have.value', '')
    })

    it("lets you check a checkbox", () => {
        cy.visit('commands/actions')
     //Note the different locator style. Parent has .checkbox class, element itself has type checkbox
        cy.get('.checkbox [type="checkbox"]').first().check()
          .should('be.checked')
    })   

    it("lets you force check a checkbox even when it is disabled thro {force: true}", () => {
        cy.visit('commands/actions')
     //Note the different locator style. Parent has .checkbox class, element itself has type checkbox
        cy.get('.checkbox [type="checkbox"]').eq(1).check({force: true})
          .should('be.checked')
    })  
})