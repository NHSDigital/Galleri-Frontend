/// <reference types="cypress" />

describe('GET target-percentage API test', () => {


    it('GET operation', () => {

        Cypress.env()
        const api_id = Cypress.env('api_id')
        const the_url = 'https://' + api_id + '.execute-api.eu-west-2.amazonaws.com/dev/target-percentage'

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