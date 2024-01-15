// <reference types="Cypress"/>

//GAL-266_GAL-352_TC01
describe('National Forescast Uptake percentage set between 1 to 100 percent', () => {
    it('Verify value should be saved successfully when user enters value between 1 and 100 percent', ()=> {

       //Step 1: User lands on the landing page
       cy.visit("http://localhost:3006");

       //Verify User is on the Invitation Variables Screen
        cy.get('.nhsuk-grid-column-full').contains('Invitation variables');

       //Step 2: Click on Amend Forecast Uptake button
       cy.get('.nhsuk-button').eq(0).click();

       //Step 3: User enters 38  in the current percentage field and click on Save changes button
       cy.get('.nhsuk-input').type(38);

       //Step 4:User click on save changes button
        cy.get('.nhsuk-button').eq(0).click();


       
    })
}) 

//GAL-266_GAL-352_TC02
describe('National Forescast Uptake percentage set between 1 to 100 percent', () => {
    it('Verify value should be saved successfully when user enters value between 1 and 100 percent', ()=> {

       //Step 1: User lands on the landing page
       cy.visit("http://localhost:3006");

       //Verify User is on the Invitation Variables Screen
        cy.get('.nhsuk-grid-column-full').contains('Invitation variables');

       //Step 2: Click on Amend Forecast Uptake button
       cy.get('.nhsuk-button').eq(0).click();

        //Step 3: User enters 1 in the current percentage field and click on Save changes button
       cy.get('.nhsuk-input').type(1);

        //Step 4:User click on save changes button
        cy.get('.nhsuk-button').eq(0).click();

        //Step 5:User should see the current percentage changed to 1%
        cy.get('.nhsuk-table__cell').contains('1');

         //Step 2: Click on Amend Forecast Uptake button
        cy.get('.nhsuk-button').eq(0).click();

        //Step 3: User enters 100 in the current percentage field and click on Save changes button
        cy.get('.nhsuk-input').type(100);

        //Step 4:User click on save changes button
        cy.get('.nhsuk-button').eq(0).click();

        //Step 5:User should see the current percentage changed to 100%
        cy.get('.nhsuk-table__cell').contains('100');

 })
}) 

//GAL-266_GAL-352_TC03
describe('National Forescast Uptake percentage set between 1 to 100 percent', () => {
    it('Verify warning message when user enters 0 in the Current Percentage field', ()=> {

       //Step 1: User lands on the landing page
       cy.visit("http://localhost:3006");

       //Verify User is on the Invitation Variables Screen
        cy.get('.nhsuk-grid-column-full').contains('Invitation variables');

       //Step 2: Click on Amend Forecast Uptake button
       cy.get('.nhsuk-button').eq(0).click();

       //Step 3: User enters 0 in the current percentage field and click on Save changes button
      cy.get('.nhsuk-input').type(0);

       //Step 4:User click on save changes button
       cy.get('.nhsuk-button').eq(0).click();

       //Step 5: User should see the warning message
       cy.get('.nhsuk-error-summary').contains('The uptake percentage must be between 1 and 100%');


    })
}) 

//GAL-266_GAL-352_TC04
describe('National Forescast Uptake percentage set between 1 to 100 percent', () => {
    it('Verify warning message when user enters value outside the permitted range', ()=> {

       //Step 1: User lands on the landing page
       cy.visit("http://localhost:3006");

       //Verify User is on the Invitation Variables Screen
       cy.get('.nhsuk-grid-column-full').contains('Invitation variables');

       //Step 2: Click on Amend Forecast Uptake button
       cy.get('.nhsuk-button').eq(0).click();

       //Step 3: User enters 135 in the current percentage field and click on Save changes button
      cy.get('.nhsuk-input').type(135);

       //Step 4:User click on save changes button
       cy.get('.nhsuk-button').eq(0).click();

       //Step 5: User should see the warning message
       cy.get('.nhsuk-error-summary').contains('The uptake percentage must be between 1% and 100%');


    })
}) 

//GAL-266_GAL-352_TC05

describe('All 5 Quintile FIll Target must add up to 100%', () => {
    it('Verify the quintile fill target values add up to 100% and saved successfully', ()=> {

       //Step 1: User lands on the landing page
       cy.visit("http://localhost:3006");

       //Verify User is on the Invitation Variables Screen
        cy.get('.nhsuk-grid-column-full').contains('Invitation variables');

        //Step 2:User clicks on Amend fill target button
        cy.get('.nhsuk-button').eq(1).click();

        //Step 3: User should see the text Quintile fill target
        cy.get('.nhsuk-table__caption').contains('Quintile fill target');
   
        //Step 4: User enters 45% in the most deprived field
        cy.get('.nhsuk-input').eq(0).type(45);
   
        //Step 5: User enters 15% in the second field
        cy.get('.nhsuk-input').eq(1).type(15);
   
         //Step 6: User enters 10% in the third field
        cy.get('.nhsuk-input').eq(2).type(10);
   
        //Step 7: User enters 10% in the fourth field
        cy.get('.nhsuk-input').eq(3).type(10);
   
        //Step 8: User enters 20% in the least deprived field
        cy.get('.nhsuk-input').eq(4).type(20);
   
        //Step 9: User clicks on save changes button
        cy.get('.nhsuk-button').eq(1).click();
   
        //Step 10: Verify the total percentage adds up to 100%
        cy.get('.nhsuk-table__cell').contains('100');
    })
}) 

//GAL-266_GAL-352_TC06

describe('All 5 Quintile FIll Target must add up to 100%', () => {
    it('Verify warning message when the quintile fill target values exceeeds 100% ', ()=> {

       //Step 1: User lands on the landing page
       cy.visit("http://localhost:3006");

       //Verify User is on the Invitation Variables Screen
       cy.get('.nhsuk-grid-column-full').contains('Invitation variables');

       //Step 2:User clicks on Amend fill target button
       cy.get('.nhsuk-button').eq(1).click();

       //Step 3: User clicks on Amend fill target button
       cy.get('.nhsuk-button').eq(1).click();

        //Step 4: User enters 25% in the most deprived field
        cy.get('.nhsuk-input').eq(0).type(25);

        //Step 5: User enters 10% in the second field
        cy.get('.nhsuk-input').eq(1).type(10);

        //Step 6: User enters 1% in the third field
        cy.get('.nhsuk-input').eq(2).type(1);

        //Step 7: User enters 10% in the fourth field
        cy.get('.nhsuk-input').eq(3).type(10);

        //Step 8: User enters 20% in the least deprived field
        cy.get('.nhsuk-input').eq(4).type(20);

        //Step 9: User clicks on save changes button
        cy.get('.nhsuk-button').eq(1).click();

        //Step 10: Verify user should be able to see the error message showing the fill targets must add up to 100%
        cy.get('.nhsuk-error-summary').should('have.text', 'The fill targets must add up to 100%');
})
})  

//GAL-266_GAL-352_TC008

describe('All 5 Quintile FIll Target must add up to 100%', () => {
    it('Verify warning message appears when the quintile fill target values exceeds 100%, then user clicks on cancel without sacving link and the changes get reverted back to previous values', ()=> {

       //Step 1: User lands on the landing page
       cy.visit("http://localhost:3006");

       //Verify User is on the Invitation Variables Screen
        cy.get('.nhsuk-grid-column-full').contains('Invitation variables');

       //Step 2:User clicks on Amend fill target button
       cy.get('.nhsuk-button').eq(1).click();

       //Step 3: User clicks on Amend fill target button
       cy.get('.nhsuk-button').eq(1).click();

        //Step 4: User enters 25% in the most deprived field
        cy.get('.nhsuk-input').eq(0).type(25);

        //Step 5: User enters 10% in the second field
        cy.get('.nhsuk-input').eq(1).type(10);

        //Step 6: User enters 1% in the third field
        cy.get('.nhsuk-input').eq(2).type(1);

        //Step 7: User enters 10% in the fourth field
        cy.get('.nhsuk-input').eq(3).type(10);

        //Step 8: User enters 20% in the least deprived field
        cy.get('.nhsuk-input').eq(4).type(20);

        //Step 9: User clicks on save changes button
        cy.get('.nhsuk-button').eq(1).click();

        //Step 10: Verify user shpuld be able to see the error message showing the fill targets must add up to 100%
        cy.get('.nhsuk-error-summary').should('have.text', 'The fill targets must add up to 100%');

        //Step 11: User click on cancel without saving link to verify the changes are reverted
        cy.get('.nhsuk-action-link__link:hover .nhsuk-action-link__text').click();

})
})  

