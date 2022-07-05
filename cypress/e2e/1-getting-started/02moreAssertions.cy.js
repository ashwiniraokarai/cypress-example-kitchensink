context("", () => {
    beforeEach(() => {
        cy.visit("/commands/actions")
    })

    //if /commands/actions is the current page then nav bar Commands drop down menu's Actions item has a .active class
    //NOTE: You don't have to start drilling all the way from Commands menu in DOM because its open/ active anyway. Start at .dropdown-menu 
    it("shows a .active class for the nav bar menu drop down item representing the current page", () => {
       cy.get('.dropdown-menu').find('li').eq(2)
       .should('have.text', 'Actions')
       .should('have.class', 'active')
    })

    //if /commands/actions is the current page then nav bar Commands drop down menu's Querying item does not have .active class
    it("does not a .active class for the a nav bar menu item that does not represent the current page", () => {
        cy.get('.dropdown-menu').find('li').eq(0)
        .should('have.text', 'Querying')
        .should('not.have.class', 'active')
    })

    //no matter what all dropdown items under the Commands menu items should 
    it("all active and inactive drop down items have href attribute-value pairs", () => {
        cy.get('.dropdown-menu').find('li').eq(0)
        .should('have.text', 'Querying')
        .should('not.have.class', 'active')
        //'have.href' chainer is not directly available unlike say 'have.class' or 'have.text' therefore the generic 'have.attr'
        .find('a').should('have.attr', 'href', '/commands/querying')
    })
})