/// <reference types="cypress" />

describe('Work with alerts', () => {
    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html');
    });

    it('Going back to the past', () => {
        // cy.get('#buttonNow').click()
        // cy.get('#resultado > span').should('contain', '01/07/2023')

        // cy.clock()

        // cy.get('#buttonNow').click()
        // cy.get('#resultado > span').should('contain', '31/12/1969')

        const dt = new Date(2012, 3, 10, 15, 23, 50)
        cy.clock(dt.getTime())

        cy.get('#buttonNow').click()
        cy.get('#resultado > span').should('contain', '10/04/2012')
    })

    it.only('Goes to the future', () => {
        cy.get('#buttonTimePassed').click()
        cy.get('#resultado > span').invoke('text').then(t => { // A função text() que está sendo invocada vai pegar o valor do elemento e a função 'gt' serve para verificar se o número é maior que o parâmetro seguinte.
            const number = parseInt(t);
            cy.wrap(number).should('gt', 1688232322942)
        }) 
        
        cy.clock()

        cy.get('#buttonTimePassed').click()
        cy.get('#resultado > span').invoke('text').then(t => { // A função text() que está sendo invocada vai pegar o valor do elemento e a função 'gt' serve para verificar se o número é maior que o parâmetro seguinte.
            const number = parseInt(t);
            cy.wrap(number).should('lte', 0)  // O 'lte' significa menor ou igual à.      
        })

        cy.get('#resultado > span').invoke('text').then(t => {
            const number = parseInt(t);
            expect(number).to.be.equal(0)
        })

        cy.tick(5000)

        cy.get('#buttonTimePassed').click()
        cy.get('#resultado > span').invoke('text').then(t => { // A função text() que está sendo invocada vai pegar o valor do elemento e a função 'gt' serve para verificar se o número é maior que o parâmetro seguinte.
            const number = parseInt(t);
            cy.wrap(number).should('gte', 5000)      
        })
    })
})