context("when data is available in a fixture file", ()=> {
    it("can read or access data from the fixture", () => {
        //data stored in cypress/fixtures/example.json file can be accessed like this
        cy.fixture('example').then((data) => {
            //reading all data in the fixture file
            cy.log("Add data", data)

            //reading specific attributes in the fixture file
            cy.log('Original name:', data.name)
            cy.log('Original email:', data.email)
            cy.log('Original body:', data.body)
        })
    })

    //you can modify the data!
    it("updates fixture data inline", () => {
        cy.fixture('example').then((data) => {
            //note: this DOES NOT modify the data in the fixture file. It only changes the data for your use here
            data.email = "ash@email"
            cy.log('Updated email:', data.email)
        })
    })


    it("reads and saves the data from the fixture into an object", () => {
        cy.fixture('example').then(function(data) {
            cy.log("Data to save", data)
            // You could do this and technically it does work but it not "instance" variable
            // let something = data;
            // cy.log("Data saved in regular var", something)

            this.data = data;
            cy.log("Data saved in 'this'", this.data)
        })
    })
})