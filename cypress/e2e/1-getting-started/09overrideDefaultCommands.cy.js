context("overwrite default cy.type() command conditionally", () => {
    beforeEach(() =>{
        cy.visit("/commands/querying")
    })

    it("overwrites the default log for .type() command if input is indicated as sensitive", () => {
        cy.get("#inputEmail")
           //calls overridden type() function but nothing changes as we are not passing "options" that needs to satisfy the if block
           .type("achuk")
        //    .should('have.value',"achuk")
       
        cy.get("#inputPassword")
          //calls overridden type() function and masks the password in the cypress log
          .type("password", { sensitive: true })
    })
})