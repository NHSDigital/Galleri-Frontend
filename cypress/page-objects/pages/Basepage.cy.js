export default class Basepage {
    static pause(ms) {
        cy.wait(ms)
    }

    static logInfo(message) {
        cy.log(message)
    }

    static setMobileVIewport(){
        cy.viewport('iphone-x')
    }

    static setTabletViewport(){
        cy.viewport('ipad-2')
    }

    static setDesktopViewport(){
        cy.viewport('macbook-13')
    }
    
    static setLargeDesktopViewport(){
        cy.viewport(1980, 1080)
    }
}