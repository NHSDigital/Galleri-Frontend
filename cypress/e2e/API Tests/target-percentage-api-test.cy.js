// <reference types="Cypress" />

describe('Target Percentage Testing', () => {

    it('GET operation', () => {
    cy.request( {
        method: 'GET',
        url: 'https://7j6zpnvol0.execute-api.eu-west-2.amazonaws.com/dev/target-percentage',
        failOnStatusCOde: false,
        headers: {
            'Accept' : 'application/json, text/plain, */*'
        }
    }).then((response) => {
        expect(response.status).to.equal(200);
       // expect(response.headers['Content-Type']).to.contain('application/json');

    })
})

    it('PUT operation', () => {
  
        cy.request( {
            method: 'PUT',
            url: 'https://je5d3ew5i1.execute-api.eu-west-2.amazonaws.com/dev/put-target-percentage',
            failOnStatusCOde: false,
            headers: {
                'Accept' : 'application/json, text/plain, */*',
        
            },
            body: {
                'targetPercentage': 80
            }
        }).then((response) => {
            expect(response.status).to.equal(200);
           // expect(response.headers['Content-Type']).to.contain('application/json');

        })
   })

   })