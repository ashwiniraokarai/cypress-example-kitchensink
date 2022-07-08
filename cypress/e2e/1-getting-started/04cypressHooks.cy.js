context("how hooks work in cypress", () => {
    before("before any test runs ensure that Spacex api returns relevant data", () => {
        //Making a network request using cy commands, not plain ol js where you'd use, say fetch
        cy.request('https://api.spacexdata.com/v3/missions')
        // simplistic approach (as shown in training)
        //   .its('body')
        //   .should('be.an', 'array')
        //   .should('have.length', 10)

        //I prefer this approach to have control over writing readable assertions :
        .should((response) => {
            cy.log(JSON.stringify(response.body))
            expect(response.status).to.eq(200)
            cy.log(JSON.stringify(response.body[0]))
            
            //this api does not simply return json objects but an ARRAY of json objects
            //lets assert on one array object:
            expect(response.body[0]).to.have.property('mission_name')
            
            //if you wanted to loop thro all objects in the array:
            //you can also use forEach instead of map
            response.body.map(element => {
                expect(element).to.have.property('mission_name')
            })

            //if you wanted to access mission name VALUES insted
            response.body.map(element => {
               element.mission_name
            })
        })
    })

    beforeEach("visit the home page", () => {
        cy.visit("/")
    })

    afterEach(() => {
        cy.log("afterEach hook has run after each test")
    })

    after(() => {
        cy.log("the final after-hook runs once")
    })

    it("the code inside this test runs after the before-hook", () => {
        cy.get('h1').should('exist')
        cy.log("first test has run")
    })

    it("this test runs right after the first test", () => {
        cy.get('h1').should('contain.text', 'Kitchen Sink')
        cy.log("second test has run")
    })
})

