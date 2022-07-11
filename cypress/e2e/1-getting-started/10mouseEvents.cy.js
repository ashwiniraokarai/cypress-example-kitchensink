context("handling mouse events - click, dblclick, rightclick, etc", () => {
    beforeEach("hit the page that has mouse events", () => {
        cy.visit("/commands/actions")
    })

    it("triggers a pop over on clicking the toggle button", () => {
        cy.get('.action-btn').click()

        //clicking on the btn produces a tiny pop-over
        //Because this pop-over is an element by itself you'll have to locate it first before chaining off and asserting on it
        cy.findByText("This popover shows up on click")
          .should('be.visible')
    })

    it("can click on specific positions/ sections", () => {
        //click w/o any specifcations will click at the center of the element
        cy.get('#action-canvas').click()
        cy.get('#action-canvas').click('top')
        cy.get('#action-canvas').click('bottom')
        cy.get('#action-canvas').click('topLeft')
        cy.get('#action-canvas').click('topRight')
        cy.get('#action-canvas').click('bottomLeft')
        cy.get('#action-canvas').click('bottomRight')

        //you also click on specific coordinates
        //cy.get('#action-canvas').click(80, 75)
        cy.get('#action-canvas').click(10, 10)
        cy.get('#action-canvas').click(50, 10)
    })

    it("triggers an edit box on double clicking", () => {
         //double click and ensure the element becomes invisible on the page right after
         cy.get('.action-div')
          .dblclick()
          .should('not.be.visible')

         //but another editable element replaces and becomes visible. Ta da. Let's confirm that too.
         cy.get('input.action-input-hidden')
          .should('be.visible')
    })

    it("it triggers an edit box on right clicking", () => {
         //double click and ensure the element becomes invisible on the page right after
         cy.get('.rightclick-action-div')
         .rightclick()
         .should('not.be.visible')

        //but another editable element replaces and becomes visible. Ta da. Let's confirm that too.
         cy.get('.rightclick-action-input-hidden')
         .should('be.visible')
    })

    //use '.trigger()' for ANY event on DOM element that isn't pre-defined in cypress
    //NOTE: This works only when the app is run on localhost because creating the hover state itself needed additional code to be written
    //in the app code: script.js
    //Will NOT work on the live site
    it("reveals the dropdown links under the Commands nav item on hover (a.k.a mouseover) action", () => {
        cy.get('.dropdown-toggle').trigger('mouseover')
        cy.get('.dropdown-menu')
          .should('be.visible')
    })
})
