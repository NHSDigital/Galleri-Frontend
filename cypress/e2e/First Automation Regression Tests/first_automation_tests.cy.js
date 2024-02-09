/// <reference types="Cypress" />
describe('Start now', () => {
it('User clicks on Continue button', () => {
//TODO: Until domain name is finalised, using this localhost url as UAT isn't working
cy.visit("http://uat-2-invitations-frontend.eba-mas6i84b.eu-west-2.elasticbeanstalk.com/")
.get('.nhsuk-header__transactional-service-name--link')
.contains('Galleri')
.get('.nhsuk-grid-column-two-thirds')
.contains('Protecting patient data');
//User checks the checkbox to say I have read and understood the message
cy.get('#confirm-privacy')
.check();
//User clicks on Continue button
cy.get('.nhsuk-button')
.click();
//Verify user is on the clinic summary screen1as
cy.get('.nhsuk-grid-row')
.contains('Clinic Summary');
//Clinic Summary Screen: User clicks on the dropdown to select the participating ICB
cy.get('#select-icb')
.select('Participating ICB QMF')
.should('have.value', 'Participating ICB QMF');
//User checks the checkbox to display clinic with no appointments available
cy.get('#displayClinicsNoApp')
.click();
// User is able to select from dropdown to display number of clinics per page
cy.get('#pageSize')
.select('20')
.should('have.value', '20');
// User is able to select from dropdown to display number of clinics per page
cy.get('#pageSize')
.select('10')
.should('have.value', '10');
//User select a phlebotomy clinic from the participating ICB
cy.get('*[id="Phlebotomy clinic 97"]')
.click();
//User should be able to click on go back link on Clinic Invitations Screen
cy.get('.nhsuk-back-link__link')
.click();
//User select a phlebotomy clinic from the participating ICB
cy.get('*[id="Phlebotomy clinic 45"]')
.click();
//Verify user is on the Clinic Invitation screen
cy.get('#clinic-information')
.should('have.text','Clinic Information');
//User clicks on Change clinic link
cy.get('#changeCancelButtonId')
.should('have.text','Change clinic')
.click();
//User clicks on the dropdown to select another phlebotomy clinic
cy.get('#clinic-selector')
.select('Phlebotomy clinic 15')
.should('have.value','Phlebotomy clinic 15');
//User clicks on Cancel change link
cy.get('#changeCancelButtonId')
.should('have.text','Cancel change')
.click();
//Verify user can see the Clinic Weekly Capacity
cy.get('.nhsuk-table__caption')
.should('contain','Clinic Weekly Capacity');
//User should Recent Invitation History table
cy.get('.nhsuk-table__heading-tab')
.should('have.text','Recent Invitation History');
//User should see the text Clinic Invitation Criteria
cy.get('#clinic-invitation-criteria-section')
.should('contain','Clinic Invitation Criteria');
//User should be able to edit the target percentage of appointments to fill field
cy.get('#input-target-percentage')
.clear()
.type('75');
//User clicks on update button
cy.get('#update-button')
.click();
//Verify that the distance from the clinic is +1 miles by default
cy.get('#milesFromSite')
.contains('+1');
//User clicks on select All LSOA checkbox
cy.get('#selectAllLsoa')
.wait(5000)
.click();
//User clicks on Calculate number to invite button
cy.get('.nhsuk-button')
.eq(1)
.click();
//Verify user is navigated to Invitation Summary screen
cy.get('#invitation-summary-heading')
.should('have.text','Invitation summary');
//Verify user can see the check details banner
cy.get('#validation-alert')
.should('have.text','Validation Alert: Check these details before you generate invitations');
//User should be able to go back to clinic invitations screen from Invitation Summary screen
cy.get('.nhsuk-back-link__link')
.click();
//User clicks on select All LSOA checkbox
cy.get('#selectAllLsoa')
.wait(5000)
.click();
//User clicks on Calculate number to invite button
cy.get('.nhsuk-button')
.eq(1)
.click();
//User clicks on Generate Invitations button
cy.get('#generate-button')
.click();
//Verify user can see the confirmation banner that invitations have been generated
cy.get('#confirmation-banner')
.should('have.text','CompleteYour invitations are confirmed and will be sent at the end of the day.');
//Verify user can see the information about what happens next once the invitations have been generated
cy.get('.govuk-heading-m')
.should('have.text','What happens next');
//User can return to clinic invitations screen by clicking on return to clinic invitations link
cy.get('#returnToClinicInvitations-link')
.should('have.text','Return to clinic invitations')
.click();
});
});