describe('Invitation Planning Parameter', () => {
    it('Allows the user to amend the forecast uptake and quintile fill target and click on cancel without saving link', ()=> {

        //Visit the url
        cy.visit('http://localhost:3008');

        //Verify User is on the Invitation Variables Screen
        cy.get('.nhsuk-grid-column-full').contains('Invitation variables');

        //Verify user should see the text National forecast uptake
        cy.get('.nhsuk-table__caption').contains('National forecast uptake');

        //User clicks on Amend forecast uptake button
        cy.get('.nhsuk-button').eq(0).click();

        //User enters a number in the Current percentage field
        cy.get('.nhsuk-input').type(35);

         //User click on save changes button
         cy.get('.nhsuk-button').eq(0).click();

         //User should see the current percentage changed to 35%
         cy.get('.nhsuk-table__cell').contains('35');

          //User clicks on Amend fill target button
        cy.get('.nhsuk-button').eq(1).click();

        //User should see the text Quintile fill target
        cy.get('.nhsuk-table__caption').contains('Quintile fill target');

        //User enters 45% in the most deprived field
        cy.get('.nhsuk-input').eq(0).type(45);

        //User enters 15% in the second field
        cy.get('.nhsuk-input').eq(1).type(15);

        //User enters 10% in the third field
        cy.get('.nhsuk-input').eq(2).type(10);

        //User enters 10% in the fourth field
        cy.get('.nhsuk-input').eq(3).type(10);

        //User enters 20% in the least deprived field
        cy.get('.nhsuk-input').eq(4).type(20);

        //User click on cancel without saving link to verify the changes are reverted
        cy.get('.nhsuk-action-link__link:hover .nhsuk-action-link__text').click();

    })
})