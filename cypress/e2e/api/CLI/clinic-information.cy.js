/// <reference types="cypress" />

describe('GET clinic-information API test', () => {

    it('GET operation', () => {

        Cypress.env()
        const api_id = Cypress.env('api_id')
        const clinic_id = Cypress.env('clinic_id')
        const clinic_name = Cypress.env('clinic_name')

        const the_url = 'https://' + api_id + '.execute-api.eu-west-2.amazonaws.com/dev/clinic-information?clinicId=' + clinic_id + '&clinicName=' + clinic_name

        cy.request({
            method: 'GET',
            url: the_url,
            failOnStatusCode: false,
            headers: {
                'accept': 'application/json'
            }
        }).then((response) => {
            expect(response.status).to.equal(200);

        })
    })

})