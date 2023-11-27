/// <reference types="cypress" />

describe('PUT target-percentage API test', () => {

    it('PUT operation', () => {

        Cypress.env()
        const api_id = Cypress.env('api_id')
        //const api_path = Cypress.env('api_path')
        const percentage = Cypress.env('percentage')

        const the_url = 'https://' + api_id + '.execute-api.eu-west-2.amazonaws.com/dev/put-target-percentage'

        cy.request( {
            method: 'PUT',
            url: the_url,
            failOnStatusCOde: false,
            headers: {
                'Accept' : '*/*',
                'Access-Control-Request-Headers' : 'content-type'
            },
            body: {
                'targetPercentage': percentage
            }

        }).then((response) => {
            expect(response.status).to.equal(200);
        })
    })

})

