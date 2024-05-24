/// <reference types="cypress" />
describe('Parameterised E2E Testing for Invitations Capabity', () => {
    beforeEach(() => {
        //TODO: Until domain name is finalised, using this UAT url
        cy.visit("https://dev-7.cicd-gps-multi-cancer-blood-test.nhs.uk")
            .get('.nhsuk-header__transactional-service-name--link')
            .contains('GPS')
            .get('.nhsuk-grid-column-full')
            .contains('GPS Sign-In Page');
        //User enters valid email address and password to Sign to GPS
        cy.get('#email').type('test@nhs.net')
        cy.get('#password').type('Testing')
        cy.get('.nhsuk-button').contains('Sign In with Email').click();
        //User checks the checkbox to say I have read and understood the message
        cy.wait(1000);
        cy.get('#confirm-privacy')
            .check();
        //User clicks on Continue button
        cy.get('.nhsuk-button')
            .click();
    });
    it('User selects participating ICB and changes a different clinic using Change Clinic Link', () => {
        //Clinic Summary Screen: User clicks on the dropdown to select the participating ICB
        cy.fixture('testcase1').then((data) => {
            cy.get('#select-icb')
                .select(data.ICB)
                .should('have.value', data.ICB);
            //user checks the box Display Clinics with no appointments available
            cy.get('#displayClinicsNoApp')
                .click();
            //User selects to display 20 clinics per page
            cy.get('#pageSize')
                .select(data.clinicsPerPage)
                .should('have.value', data.clinicsPerPage);
            //User select a phlebotomy clinic from the participating ICB
            cy.get(`*[id="${data.PhlebotomySite}"]`)
                .click();
            //Verify the address for clinic
            cy.get('.nhsuk-summary-list__value')
                .should('contain', data.address);
            //Verify the appointments remaining for this clinic
            cy.get('.nhsuk-table__row')
                .should('contain', data.appointmentsRemaining);
            //User should be able to edit the target percentage of appointments to fill field
            cy.get('#input-target-percentage')
                .clear()
                .type(data.targetPercentage);
            //User clicks on update button
            cy.get('#update-button')
                .click();
            //Verify the target number of appointments to fill
            cy.get('#target-apps-to-fill')
                .should('contain', data.targetAppointmentsToFill);
            cy.get('#input-target-percentage')
                .clear()
                .type(data.targetPercentage1);
            //User clicks on update button
            cy.get('#update-button')
                .click();
            //Verify the target appointments to fill
            cy.get('#target-apps-to-fill')
                .should('contain', data.targetAppointmentsToFill1);
            //User clicks on Change clinic link
            cy.get('#changeCancelButtonId')
                .should('have.text', 'Change clinic')
                .click();
            //User clicks on the dropdown to select another phlebotomy clinic
            cy.get('#clinic-selector')
                .select(data.NewPhlebotomySite)
                .should('have.value', data.NewPhlebotomySite);
            //User clicks on Cancel change link
            cy.get('#changeCancelButtonId')
                .should('have.text', 'Cancel change')
                .click();
            //Verify user can see the Clinic Weekly Capacity
            cy.get('.nhsuk-table__caption')
                .should('contain', 'Clinic Weekly Capacity');
            //User should Recent Invitation History table
            cy.get('.nhsuk-table__heading-tab')
                .should('have.text', 'Recent Invitation History');
        });
    });
    it('User selects participating ICB and generates invitations', () => {
        //Clinic Summary Screen: User clicks on the dropdown to select the participating ICB
        cy.fixture('testcase2').then((data) => {
            cy.get('#select-icb')
                .select(data.ICB)
                .should('have.value', data.ICB);
            //User select a phlebotomy clinic from the participating ICB
            cy.get(`*[id="${data.PhlebotomySite}"]`)
                .click();
            //Verify the address for clinic
            cy.get('.nhsuk-summary-list__value')
                .should('contain', data.address);

            //User should be able to edit the target percentage of appointments to fill field
            cy.get('#input-target-percentage')
                .clear()
                .type(data.targetPercentage);
            //User clicks on update button
            cy.get('#update-button')
                .click();
            //Verify user gets the error message
            cy.get('#error-message')
                .should('have.text', 'Error:The target percentage must be between 1% and 100%');
            //User should be able to edit the target percentage of appointments to fill field
            cy.get('#input-target-percentage')
                .clear()
                .type(data.targetPercentage1);
            //User clicks on update button
            cy.get('#update-button')
                .click();
            //Verify that the distance from the clinic is +1 miles by default
            cy.get('#milesFromSite')
                .contains(data.distance);
            //User selects the dustance +5 miles from the selected clinic
            cy.get('#milesFromSite')
                .select(data.distance1);
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
                .should('have.text', data.invitationSummaryHeader);
            //Verify user can see the check details banner
            cy.get('#validation-alert')
                .should('have.text', data.validationBanner);
            //User clicks on Generate Invitations button
            cy.get('#generate-button')
                .click();
            //Verify user can see the confirmation banner that invitations have been generated
            cy.get('#confirmation-banner')
                .should('have.text', data.confirmationBanner);
            //Verify user can see the information about what happens next once the invitations have been generated
            cy.get('.govuk-heading-m')
                .should('have.text', data.whatHappensNextLink);
            //User can return to clinic invitations screen by clicking on return to clinic invitations link
            cy.get('#returnToClinicInvitations-link')
                .should('have.text', data.returnToClinicInvitationsLink)
                .click();
        });
    });
    it('User selects participating ICB and leaves target percentage of appointents to fill field as blank', () => {
        //Clinic Summary Screen: User clicks on the dropdown to select the participating ICB
        cy.fixture('testcase3').then((data) => {
            cy.get('#select-icb')
                .select(data.ICB)
                .should('have.value', data.ICB);
            //user checks the box Display Clinics with no appointments available
            // cy.get('#displayClinicsNoApp')
            //     .click();
            //User selects to display 10 clinics per page
            cy.get('#pageSize')
                .select(data.clinicsPerPage)
                .should('have.value', data.clinicsPerPage);
            //User select a phlebotomy clinic from the participating ICB
            cy.get(`*[id="${data.PhlebotomySite}"]`)
                .click();
            //Verify the address for clinic
            cy.get('.nhsuk-summary-list__value')
                .should('contain', data.address);
            //Verify the appointments remaining for this clinic
            cy.get('.nhsuk-table__row')
                .should('contain', data.appointmentsRemaining);
            //User should be able to edit the target percentage of appointments to fill field
            cy.get('#input-target-percentage')
                .clear();
            //User clicks on update button
            cy.get('#update-button')
                .click();
            //Verify the error banner
            cy.get('#error-target-title')
                .contains('There is a problem');
            //Verify the error link and click on it
            cy.get('.nhsuk-error-summary__body')
                .contains('Enter a target percentage between 1% and 100%')
                .click();
            //Verify user gets the error message
            cy.get('#error-message')
                .should('have.text', 'Error:The target percentage must be between 1% and 100%');
            //User clicks on Change clinic link
            cy.get('#changeCancelButtonId')
                .should('have.text', 'Change clinic')
                .click();
            //User clicks on the dropdown to select another phlebotomy clinic
            cy.get('#clinic-selector')
                .select(data.NewPhlebotomySite)
                .should('have.value', data.NewPhlebotomySite);
            //User clicks on Cancel change link
            cy.get('#changeCancelButtonId')
                .should('have.text', 'Cancel change')
                .click();
            //Verify user can see the Clinic Weekly Capacity
            cy.get('.nhsuk-table__caption')
                .should('contain', 'Clinic Weekly Capacity');
            //User should Recent Invitation History table
            cy.get('.nhsuk-table__heading-tab')
                .should('have.text', 'Recent Invitation History');
        });
    });
    it('User selects participating ICB and uses pagination to go to results', () => {
        //Clinic Summary Screen: User clicks on the dropdown to select the participating ICB
        cy.fixture('testcase4').then((data) => {
            cy.get('#select-icb')
                .select(data.ICB)
                .should('have.value', data.ICB);
            //user checks the box Display Clinics with no appointments available
            // cy.get('#displayClinicsNoApp')
            //     .click();
            //User selects to display 10 clinics per page
            cy.get('#pageSize')
                .select(data.clinicsPerPage)
                .should('have.value', data.clinicsPerPage);
            cy.get(`*[id="${data.PhlebotomySite}"]`)
                .click();
            cy.get('#milesFromSite')
                .contains(data.distance);
            //User selects the dustance +5 miles from the selected clinic
            cy.get('#milesFromSite')
                .select(data.distance1);
            //User clicks on next link to view more results
            cy.get('#nextButton')
                .click();
            //User clicks on previous link to go back to prvious results page
            cy.get('#prevButton')
                .click();
            //Verify the address for clinic
            cy.get('.nhsuk-summary-list__value')
                .should('contain', data.address);
        });
    });
    it('User selects participating ICB and do not select any LSOA', () => {
        //Clinic Summary Screen: User clicks on the dropdown to select the participating ICB
        cy.fixture('testcase5').then((data) => {
            cy.get('#select-icb')
                .select(data.ICB)
                .should('have.value', data.ICB);
            //user checks the box Display Clinics with no appointments available
            cy.get('#displayClinicsNoApp')
                .click();
            //User selects to display 10 clinics per page
            cy.get('#pageSize')
                .select(data.clinicsPerPage)
                .should('have.value', data.clinicsPerPage);
            //User select a phlebotomy clinic from the participating ICB
            cy.get(`*[id="${data.PhlebotomySite}"]`)
                .click();
            //Verify the address for clinic
            cy.get('.nhsuk-summary-list__value')
                .should('contain', data.address);
            //Verify the appointments remaining for this clinic
            cy.get('.nhsuk-table__row')
                .should('contain', data.appointmentsRemaining);
            //User should be able to edit the target percentage of appointments to fill field
            cy.get('#input-target-percentage')
                .clear()
                .type(data.targetPercentage);
            //User clicks on update button
            cy.get('#update-button')
                .click();
            //Verify the target appointments to fill
            cy.get('#target-apps-to-fill')
                .should('contain', data.targetAppointmentsToFill);
            //User selects the distance +5 miles from the selected clinic
            cy.get('#milesFromSite')
                .select(data.distance);
            //User clicks on select All LSOA checkbox
            cy.get('#selectAllLsoa')
                .wait(5000)
                .click();
            //User unchecks All selected LSOA
            cy.get('#selectAllLsoa')
                .uncheck();
            //User clicks on Calculate number to invite button
            cy.get('.nhsuk-button')
                .eq(1)
                .click();
            //Verify the error banner that says there is a problem
            cy.get('#error-target-title')
                .should('have.text', data.errorBanner)
            //Verify the error link and click on it
            cy.get('.nhsuk-error-summary__body')
                .contains(data.errorLink)
                .click();
            //Verify the user is taken to LSOA table by clicking on the error link
            cy.get('#lsoa-error-message')
                .should('have.text', data.lsoaTableErrorMessage);
        });
    });
});
