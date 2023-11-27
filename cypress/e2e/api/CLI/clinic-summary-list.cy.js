/// <reference types="cypress" />

describe('GET clinic-summary-list API test', () => {

    it('GET operation', () => {

        Cypress.env()
        const api_id = Cypress.env('api_id')
        const participatingIcb = Cypress.env('participatingIcb')
        
        const the_url = 'https://' + api_id + '.execute-api.eu-west-2.amazonaws.com/dev/clinic-summary-list?participatingIcb=' + participatingIcb

        cy.request({
            method: 'GET',
            //url: 'https://yuvf0jcaql.execute-api.eu-west-2.amazonaws.com/dev/clinic-summary-list?participatingIcb=QJK',
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