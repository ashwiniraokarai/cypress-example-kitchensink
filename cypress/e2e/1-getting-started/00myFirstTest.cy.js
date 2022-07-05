
const navBarText = Cypress.env("navBarText")
context("my first test", () => {
   beforeEach(() => {
        //cy.visit("https://example.cypress.io/commands/actions")
        cy.visit('/commands/actions')
   })

   it("has h1 attribute with correct text", () => {
      cy.get('h1')
      .should('exist')
      .should('contain.text', 'Actions')
   })

   it("renders a paragraph below the h1", () => {
      //the paragraph can be located via its immediate parent which is associated with a .container class
      //the parent's css locator .container class matches several elements on the page, so we zero in on the second index using .eq(1)
      cy.get('.container').eq(1)
      .find('p').should('exist')
   })

   it("renders a section with the correct elements", () => {
      cy.get('.container').eq(2).within(() => {
         //there are many elements within the .container element so we can limit scope within that container
         cy.get('h4').should('contain.text', 'type()')
         cy.get('p').should('exist')
         cy.get('pre').should('exist')
      })
   })

   //utilizing locators provided by the cypress testing library plugin
   it("locates cypress.io link via the cypress testing library style locator", () => {
      cy.findByText(navBarText).should('exist')
   })
})