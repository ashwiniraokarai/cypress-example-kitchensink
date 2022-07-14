const iceCream = () => {
    return "Chocolate Icecream"
}

it("shows the correct return value of the object", () => {
    //wrap convert the object iceCream into cypress and invokes key name passed with object Hero in the wrap to assert that it should be equal to its returns true.
    cy.wrap({ somekey: iceCream } ).invoke('somekey').should('eq', 'Chocolate Icecream') //pass
    // cy.wrap({ name: iceCream } ).invoke('name').should('eq', 'random Icecream') //fail
})

