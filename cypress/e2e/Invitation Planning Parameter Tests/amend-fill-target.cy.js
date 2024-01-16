describe('Amend forecast uptake', () => {
it('Allows the user to amend the forecast uptake', ()=> {
//Visit the url
cy.visit('http://localhost:3006');
//Verify User is on the Invitation Variables Screen
cy.get('.nhsuk-grid-column-full').contains('Invitation variables');
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
//User clicks on save changes button
cy.get('.nhsuk-button').eq(1).click();
//Verify the total percentage adds up to 100%
cy.get('.nhsuk-table__cell').contains('100');
//User clicks on Amend fill target button
cy.get('.nhsuk-button').eq(1).click();
//User enters 25% in the most deprived field
cy.get('.nhsuk-input').eq(0).type(25);
//User enters 10% in the second field
cy.get('.nhsuk-input').eq(1).type(10);
//User enters 1% in the third field
cy.get('.nhsuk-input').eq(2).type(1);
//User enters 10% in the fourth field
cy.get('.nhsuk-input').eq(3).type(10);
//User enters 20% in the least deprived field
cy.get('.nhsuk-input').eq(4).type(20);
//User clicks on save changes button
cy.get('.nhsuk-button').eq(1).click();
//Verify user shpuld be able to see the error message showing the fill targets must add up to 100%
cy.get('.nhsuk-error-summary').should('have.text', 'The fill targets must add up to 100%');
})
})