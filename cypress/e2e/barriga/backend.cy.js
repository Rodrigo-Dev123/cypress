/// <reference types="cypress" />

describe('should test at a functional level', () => {
    beforeEach(() => {
        // cy.login('rodrigodevjavascript@gmail.com', 'cypress')
        // cy.resetApp()
    })
    
    it('Should create an account', () => {        
        cy.request({
            method: 'POST',
            url: 'https://barrigarest.wcaquino.me/signin',
            body: {
                email: "rodrigodevjavascript@gmail.com", 
                senha: "cypress", 
                redirecionar: false
            }
        }).its('body.token').should('not.be.empty')
    })
    
    it('Should update an account', () => {
        
    })

    it('Should not create an acount with same name', () => {
        
    })

    it('should create a transaction', () => {
        
    })

    it('Should get balance', () => {
        
    })

    it('Should remove a transition', () => {
       
    })
})