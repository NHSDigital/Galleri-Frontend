export default class Navbar {
    static clickOnLogo(){
        cy.get('.nhsuk-logo__background').click()
    }

    static clickOnGalleri(){
        cy.get('.nhsuk-header__transactional-service-name--link').click()
    }

    static clickOnClinicSummary(){
        cy.get('.nhsuk-header__navigation-link').click()
    }
}