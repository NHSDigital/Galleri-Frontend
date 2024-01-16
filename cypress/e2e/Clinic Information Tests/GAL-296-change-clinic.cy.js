/// <reference types="Cypress" />

//GAL-296_TC01

describe('Go back link', () => {
it('Verify Go back link is displayed and clickable', () => {
//1. Visits the Url
cy.visit('http://localhost:3003'); 
//2. User lands on the Clinic Invitations Screen 
cy.get('#maincontent')
.should('have.text','Clinic Information')
//3. User clicks on the Go back link
cy.get('.nhsuk-back-link__link').click();
})
})
//GAL-296_TC02
describe('Selected Phlebotomy Clinic Details', () => {
it('Verify user clicks on the phlebotomy clinic from clinic list', () => {
//1. Visits the Url
cy.visit('http://localhost:3003'); 
//2. User lands on the Clinic Invitations Screen
cy.get('#maincontent')
.should('have.text','Clinic Information')
//3. User should be able to see the name of the selected phlebotomy clinic
cy.get('#term1-label')
.should('have.text','Phlebotomy clinic 40')
//4. User should be able to see the address of the selected phlebotomy clinic
cy.get('#term2-label')
.should('contain', 'PX0 1DE');
//5. User should be able to see the weekly capacity of the selected phlebotomy clinic
cy.get('.nhsuk-table__caption')
.should('contain','Clinic Weekly Capacity')
//6. User should be able to see the Recent Invitation History of the selected phlebotomy clinic
cy.get('.nhsuk-table__panel-with-heading-tab')
.should('have.text', 'Recent Invitation History');
})
})
//GAL-296_TC03
describe('View all previous invitations link', () => {
it('Verify user is taken to a screen where all previously generated invitation details are displayed', () => {
//1. Visits the Url
cy.visit('http://localhost:3003'); 
//2. User lands on the Clinic Invitations Screen
cy.get('#maincontent')
.should('have.text','Clinic Information')
//3.User clicks on view all previous invitations link
cy.get('#changeCancelButtonId')
.should('have.text','View all previous invitations')
.click();
})
})
//GAL-296_TC04
describe('Clinic Weekly Capacity', () => {
it('Verify clinic weekly capacity table when some of the weeks are fully booked', () => {
//1. Visits the Url
cy.visit('http://localhost:3003'); 
//2. User lands on the Clinic Invitations Screen
cy.get('#maincontent')
.should('have.text','Clinic Information')
//3. User should be able to see Appointments remaining as 0 in that particular week column
})
})
//GAL-296_TC05
describe('Last Updated information', () => {
it('Verify user should be able to see the date and time when the data in the table was last updated', () => {
//1. Visits the Url
cy.visit('http://localhost:3003'); 
//2. User lands on the Clinic Invitations Screen
cy.get('#maincontent')
.should('have.text','Clinic Information')
//3.User should see the date and time of the last update
cy.get('#last-updated-hint')
.should('contain','Last Updated: ');
})
})
//GAL-296_TC06
describe('Recent Invitation History table', () => {
it('Verify user should see all the columns in the Recent Invitation History', () => {
//1. Visits the Url
cy.visit('http://localhost:3003'); 
//2. User lands on the Clinic Invitations Screen
cy.get('#maincontent')
.should('have.text','Clinic Information')
//3.User should see Date of Previous invitations as Not available or 0
cy.get('');
//4. User should see days since previous invitations as Not available or 0
cy.get('');
//5. User should see invitations sent as 0
cy.get('');
//6. User should see appointments remaining as value set by the user
cy.get('');
})
})
//GAL-296_TC07
describe('Change clinic', () => {
it('allows the user to change the phlebotomy clinic', () => {
//1.Visit the url
cy.visit('http://localhost:3000');
//This will take a screenshot as soon as the landing page has loaded
cy.screenshot('Original State Change Clinic');    
//Verify that user should be able to last updated date and time under Clinic Capacity Weekly
cy.get('#last-updated-hint').should('contain','Last Updated: ');
//2.Select the element or data source containing the original clinic name
cy.get('#term1-label')
.should('have.text','Phlebotomy clinic 40')
//3.User clicks on change clinic link
cy.get('#changeCancelButtonId')
.click()
//4.User can see the text select another clinic from the same ICB
cy.get('.nhsuk-label').should('have.text', 'Select another clinic from the same ICB');
//5.User clicks on another clinic from the dropdown
cy.get('#clinic-selector')
.select('Phlebotomy clinic 90')
.should('have.value','Phlebotomy clinic 90')
//6.User see the updated details of the different phlebotomy clinic
cy.get('#term1-label').should('have.text','Phlebotomy clinic 90');
//A screenshot will be taken at the end of the test to check the state of the application once the test has been conducted
cy.screenshot('Change-Clinic-Evidence');
})
})
//GAL-296_TC09
describe('Cancel change', () => {
it('allows the user to cancel any changes they wanted to make to the Phlebotomy clinic', () => {   
//1. Visits the Url
cy.visit('http://localhost:3003');  
//2. Select the element of the original postcode we want to compare
cy.get('.nhsuk-summary-list__value').should('contain', 'OP0 1HP');  
//3. User clicks on ‘Change clinic’ link
cy.get('#changeCancelButtonId')
.should('have.text','Change clinic')
.click() 
//4. User selects another clinic from the dropdown menu
cy.get('#clinic-selector').select('Phletbotomy clinic 2');  
//5. User clicks on ‘Cancel change’ link
cy.get('#changeCancelButtonId')
.should('have.text','Cancel change')
.click()  
//6. User should be able to see no changes have occurred
cy.get('.nhsuk-summary-list__value').should('contain', 'OP0 1HP');  });
});
  