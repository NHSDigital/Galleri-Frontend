/// <reference types="cypress" />

//const csv = require('neat-csv')

describe('Parameterised Testing', () => {
    //let particpatingICB
    beforeEach(() => {
       //TODO: Until domain name is finalised, using this localhost url as UAT isn't working
       cy.visit("http://localhost:3001")
       .get('.nhsuk-grid-column-two-thirds')
       .contains('Galleri Pilot System')
       .get('.nhsuk-button')
       .click()

        })
    

    it('User selects participating ICB', () => {

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
        cy.get('*[id="Phlebotomy clinic 25"]')
        .click()

        //Verify the address for clinic 25 is 25 nucleohistone Street Gondor PL6 8BU
        cy.get('.nhsuk-summary-list__value')
        .should('contain',data.address)
         
        //Verify the appointments remaining is 197 for this clinic
        cy.get('.nhsuk-table__row')
        .should('contain',data.appointmentsRemaining)

        //User should be able to edit the target percentage of appointments to fill field
        cy.get('#input-target-percentage')
        .clear()
        .type(data.targetPercentage)

        //User clicks on update button
        cy.get('#update-button')
        .click()

        //Verify the target number of appointments to fill is 49
        cy.get('#summary-list-content')
        .should('contain',data.targetAppointmentsToFill)

         })

        })

        it('User selects participating ICB', () => {

            //Clinic Summary Screen: User clicks on the dropdown to select the participating ICB
            cy.fixture('testcase2').then((data) => {
    
            cy.get('#select-icb')
            .select(data.ICB)
            .should('have.value',data.ICB)
           
            //User select a phlebotomy clinic from the participating ICB
            cy.get('*[id="Phlebotomy clinic 7"]')
            .click()
    
            //Verify the address for clinic 7 is 7 forecaddie Street
            cy.get('.nhsuk-summary-list__value')
            .should('contain',data.address)
             
            //Verify the appointments remaining is 306 for this clinic
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
            .should('have.text','The target percentage must be between 1% and 100%')
    
    
            })
    
           })

})

