/// <reference types="cypress" />

describe('Esperas...', () => {

    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html');
    });

    beforeEach(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html'); // O beforeEach permite execultar antes de cada teste.
    })

    it('Deve aguardar elemento estar disponível', () => {
        cy.get('#novoCampo').should('not.exist')
        cy.get('#buttonDelay').click()
        cy.get('#novoCampo').type('funciona')
    })

    it('Deve fazer retrys', () => {  
        cy.get('#buttonDelay').click()
        cy.get('#novoCampo')
         // .should('not.exist') // Nesta condição ele irá retornar null
            .should('exist')
            .type('funciona')
            
    })

    it('Uso do find', () => {
        cy.get('#buttonListDOM').click()
        cy.get('#lista li')
            .find('span') // Esta função obtem os elementos DOM descendentes do seletor específico.
            .should('contain', 'Item 1')
        // cy.get('#lista li')
        //     .find('span')     // O uso do find() nessa operação para verificar dois elemetos de texto pode dar erro.
        //     .should('contain', 'Item 2') 
        cy.get('#lista li span')
            .should('contain', 'Item 2')   
    })

    it('Uso do timeout', () => {
        // cy.get('#buttonDelay').click()
        // cy.get('#novoCampo', { timeout: 1000 }).should('exist')

        // cy.get('#buttonListDOM').click()
        // cy.wait(5000) // O await paraliza todo o teste enquanto aguarda pelo tempo especificado.
        // cy.get('#buttonListDOM').click()
        // cy.get('#lista li span', { timeout: 30000 }) // Se o resultado for obtido antes do 30 segundos o timeout é parado.
        
        cy.get('#buttonListDOM').click()
        cy.get('#lista li span')
            .should('have.length', 1)
        cy.get('#lista li span')
            .should('have.length', 2)
    
        })

        it('Click retry', () => {
            cy.get('#buttonCount')
                .click()  // Comandos que alteram o html não são reexecultados.
                .click()
                .should('have.value', '111')
        })

        it.only('Should vs Then', () => {
            cy.get('#buttonListDOM').then($el => {  
                expect($el).to.have.length(1)  // Ao fazer novas buscas dentro de um bloco get() é necessário usar o then() ao invés do should.
                cy.get('#buttonList')
            })
        })
    }) 