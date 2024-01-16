/// <reference types="cypress" />

//const csv = require('neat-csv')

describe('Parameterised Testing', () => {
    //let particpatingICB
    beforeEach(() => {
       //TODO: Until domain name is finalised, using this localhost url as UAT isn't working
       cy.visit("http://uat-2-invitations-frontend.eba-mas6i84b.eu-west-2.elasticbeanstalk.com/")
       .get('.nhsuk-header__transactional-service-name--link')
        .contains('Galleri')
        .get('.nhsuk-grid-column-two-thirds')
        .contains('Protecting patient data')

        //User checks the checkbox to say I have read and understood the message
        cy.get('#confirm-privacy')
        .check()
 
        //User clicks on Continue button
        cy.get('.nhsuk-button')
        .click()

        })
    

    it('User selects participating ICB and changes a different clinic using Change Clinic Link', () => {

        //Clinic Summary Screen: User clicks on the dropdown to select the participating ICB
        cy.fixture('testcase1').then((data) => {

        cy.get('#select-icb')
        .select(data.ICB)
        .should('have.value',data.ICB)

        //user checks the box Display Clinics with no appointments available
        cy.get('#displayClinicsNoApp')
        .click()
       
        //User selects to display 20 clinics per page
        cy.get('#pageSize')
        .select(data.clinicsPerPage)
        .should('have.value',data.clinicsPerPage)

        //User select a phlebotomy clinic from the participating ICB
        cy.get('*[id="Phlebotomy clinic 61"]')
        .click()

        //Verify the address for clinic 61 is 61 overweighs Hospital Mordor EX5 2GE
        cy.get('.nhsuk-summary-list__value')
        .should('contain',data.address)
         
        //Verify the appointments remaining is 317 for this clinic
        cy.get('.nhsuk-table__row')
        .should('contain',data.appointmentsRemaining)

        //User should be able to edit the target percentage of appointments to fill field
        cy.get('#input-target-percentage')
        .clear()
        .type(data.targetPercentage)

        //User clicks on update button
        cy.get('#update-button')
        .click()

        //Verify the target number of appointments to fill is 79
        cy.get('#target-apps-to-fill')
        .should('contain',data.targetAppointmentsToFill)

        //User clicks on Change clinic link
        cy.get('#changeCancelButtonId')
        .should('have.text','Change clinic')
        .click()

        //User clicks on the dropdown to select another phlebotomy clinic
        cy.get('#clinic-selector')
        .select('Phlebotomy clinic 5')
        .should('have.value','Phlebotomy clinic 5')

        //User clicks on Cancel change link
        cy.get('#changeCancelButtonId')
        .should('have.text','Cancel change')
        .click()

        //Verify user can see the Clinic Weekly Capacity
        cy.get('.nhsuk-table__caption')
        .should('contain','Clinic Weekly Capacity')

        //User should Recent Invitation History table
        cy.get('.nhsuk-table__heading-tab')
        .should('have.text','Recent Invitation History')

       })

        })

        it('User selects participating ICB and generates invitations', () => {

        //Clinic Summary Screen: User clicks on the dropdown to select the participating ICB
        cy.fixture('testcase2').then((data) => {
    
        cy.get('#select-icb')
        .select(data.ICB)
        .should('have.value',data.ICB)
           
        //User select a phlebotomy clinic from the participating ICB
        cy.get('*[id="Phlebotomy clinic 23"]')
        .click()
    
        //Verify the address for clinic 23 is 	23 hypertonus Avenue
        cy.get('.nhsuk-summary-list__value')
        .should('contain',data.address)
             
        //Verify the appointments remaining is 360 for this clinic
        cy.get('.nhsuk-table__row')
        .should('contain',data.appointmentsRemaining)
    
        //User should be able to edit the target percentage of appointments to fill field
        cy.get('#input-target-percentage')
        .clear()
        .type(data.targetPercentage)
    
        //User clicks on update button
        cy.get('#update-button')
        .click()

        //Verify user gets the error message
        cy.get('#error-message')
        .should('have.text','Error:The target percentage must be between 1% and 100%')

        //User should be able to edit the target percentage of appointments to fill field
        cy.get('#input-target-percentage')
        .clear()
        .type(data.targetPercentage1)

        //User clicks on update button
        cy.get('#update-button')
        .click()

        //Verify the target appointments to fill is 270
        cy.get('#target-apps-to-fill')
        .should('contain',data.targetAppointmentsToFill)

        //Verify that the distance from the clinic is +1 miles by default
        cy.get('#milesFromSite')
        .contains(data.distance)

        //User selects the dustance +5 miles from the selected clinic
        cy.get('#milesFromSite')
        .select(data.distance1)

        //User clicks on select All LSOA checkbox
        cy.get('#selectAllLsoa')
        .wait(5000)
        .click()

        //User clicks on Calculate number to invite button
        cy.get('.nhsuk-button')
        .eq(1)
        .click()

        //Verify user is navigated to Invitation Summary screen
        cy.get('#invitation-summary-heading')
        .should('have.text',data.invitationSummaryHeader)

      //Verify user can see the check details banner
       cy.get('#validation-alert')
       .should('have.text',data.validationBanner)  

     //User clicks on Generate Invitations button
     cy.get('#generate-button')
     .click()

     //Verify user can see the confirmation banner that invitations have been generated
     cy.get('#confirmation-banner')
     .should('have.text',data.confirmationBanner)

     //Verify user can see the information about what happens next once the invitations have been generated
     cy.get('.govuk-heading-m')
     .should('have.text',data.whatHappensNextLink)

     //User can return to clinic invitations screen by clicking on return to clinic invitations link
     cy.get('#returnToClinicInvitations-link')
     .should('have.text', data.returnToClinicInvitationsLink)
     .click()
     
    
    
     })
    
 })

 it('User selects participating ICB and leaves target percentage of appointents to fill field as blank', () => {

    //Clinic Summary Screen: User clicks on the dropdown to select the participating ICB
    cy.fixture('testcase3').then((data) => {

    cy.get('#select-icb')
    .select(data.ICB)
    .should('have.value',data.ICB)

    //user checks the box Display Clinics with no appointments available
    cy.get('#displayClinicsNoApp')
    .click()
   
    //User selects to display 10 clinics per page
    cy.get('#pageSize')
    .select(data.clinicsPerPage)
    .should('have.value',data.clinicsPerPage)

    //User select a phlebotomy clinic from the participating ICB
    cy.get('*[id="Phlebotomy clinic 55"]')
    .click()

    //Verify the address for clinic 55 is 55 nonvacuously Hospital  Gondor LS1 3EX
    cy.get('.nhsuk-summary-list__value')
    .should('contain',data.address)
     
    //Verify the appointments remaining is 301 for this clinic
    cy.get('.nhsuk-table__row')
    .should('contain',data.appointmentsRemaining)

    //User should be able to edit the target percentage of appointments to fill field
    cy.get('#input-target-percentage')
    .clear()
    
    //User clicks on update button
    cy.get('#update-button')
    .click()

    //Verify the error banner
    cy.get('#error-target-title')
    .contains('There is a problem')

    //Verify the error link and click on it
    cy.get('.nhsuk-error-summary__body')
    .contains('Enter a target percentage between 1% and 100%')
    .click()


    //Verify user gets the error message
    cy.get('#error-message')
    .should('have.text','Error:The target percentage must be between 1% and 100%')

    //User clicks on Change clinic link
    cy.get('#changeCancelButtonId')
    .should('have.text','Change clinic')
    .click()

    //User clicks on the dropdown to select another phlebotomy clinic
    cy.get('#clinic-selector')
    .select('Phlebotomy clinic 40')
    .should('have.value','Phlebotomy clinic 40')

    //User clicks on Cancel change link
    cy.get('#changeCancelButtonId')
    .should('have.text','Cancel change')
    .click()

    //Verify user can see the Clinic Weekly Capacity
    cy.get('.nhsuk-table__caption')
    .should('contain','Clinic Weekly Capacity')

    //User should Recent Invitation History table
    cy.get('.nhsuk-table__heading-tab')
    .should('have.text','Recent Invitation History')

   })

    })

    it('User selects participating ICB and uses pagination to go to results', () => {

        //Clinic Summary Screen: User clicks on the dropdown to select the participating ICB
        cy.fixture('testcase4').then((data) => {
    
        cy.get('#select-icb')
        .select(data.ICB)
        .should('have.value',data.ICB)
    
        //user checks the box Display Clinics with no appointments available
        cy.get('#displayClinicsNoApp')
        .click()
       
        //User selects to display 10 clinics per page
        cy.get('#pageSize')
        .select(data.clinicsPerPage)
        .should('have.value',data.clinicsPerPage)
    
        //User clicks on next link to view more results
        cy.get('#nextButton')
        .click()

        //User clicks on previous link to go back to prvious results page
        cy.get('#prevButton')
        .click()

        //User select a phlebotomy clinic from the participating ICB
        cy.get('*[id="Phlebotomy clinic 20"]')
        .click()
    
        //Verify the address for clinic 20 is BS10 5NB
        cy.get('.nhsuk-summary-list__value')
        .should('contain',data.address)
         
    
       })
    
        })

        it('User selects participating ICB and do not select any LSOA', () => {

            //Clinic Summary Screen: User clicks on the dropdown to select the participating ICB
            cy.fixture('testcase5').then((data) => {
        
            cy.get('#select-icb')
            .select(data.ICB)
            .should('have.value',data.ICB)
        
            //user checks the box Display Clinics with no appointments available
            cy.get('#displayClinicsNoApp')
            .click()
           
            //User selects to display 10 clinics per page
            cy.get('#pageSize')
            .select(data.clinicsPerPage)
            .should('have.value',data.clinicsPerPage)
    
            //User select a phlebotomy clinic from the participating ICB
            cy.get('*[id="Phlebotomy clinic 44"]')
            .click()
        
            //Verify the address for clinic 44 is Mordor
            cy.get('.nhsuk-summary-list__value')
            .should('contain',data.address)

            //Verify the appointments remaining is 231 for this clinic
            cy.get('.nhsuk-table__row')
            .should('contain',data.appointmentsRemaining)

            //User should be able to edit the target percentage of appointments to fill field
            cy.get('#input-target-percentage')
            .clear()
            .type(data.targetPercentage)

           //User clicks on update button
           cy.get('#update-button')
           .click()

           //Verify the target appointments to fill is 57
           cy.get('#target-apps-to-fill')
           .should('contain',data.targetAppointmentsToFill)

           //User selects the distance +5 miles from the selected clinic
           cy.get('#milesFromSite')
           .select(data.distance)

           //User clicks on select All LSOA checkbox
           cy.get('#selectAllLsoa')
           .wait(5000)
           .click()

           //User unchecks All selected LSOA
           cy.get('#selectAllLsoa')
           .uncheck()

            //User clicks on Calculate number to invite button
            cy.get('.nhsuk-button')
            .eq(1)
            .click()

            //Verify the error banner that says thereis a problem
            cy.get('#error-target-title')
            .should('have.text',data.errorBanner)

            //Verify the error link and click on it
            cy.get('.nhsuk-error-summary__body')
            .contains(data.errorLink)
            .click()

            //Verify the user is taken to LSOA table by clicking on the error link
            cy.get('#lsoa-error-message')
            .should('have.text',data.lsoaTableErrorMessage)


             
        
           })
        
            })



})

