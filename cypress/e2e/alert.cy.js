/// <reference types="cypress" />

describe('Work with alerts', () => {
    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html');
    });

    // beforeEach(() => {
    //     cy.visit('https://wcaquino.me/cypress/componentes.html'); // O beforeEach permite execultar antes de cada teste.
    //     // cy.reload();
    // })

    it.only('Alert', () => {
        // cy.get('#alert').click()
        // cy.on('window:alert', msg => { // o on() pega enventos que acontecem na tela
        //     console.log(msg);
        //     expect(msg).to.be.equal('Alert Simples')
        // })
        cy.clickAlert('#alert', 'Alert Simples')
    })

    it('Alert com mock', () => {
        const stub = cy.stub().as('alerta') // o stub() substitui uma função, registra o uso e controla o seu comportamento
        cy.on('window:alert', stub) // o on() pega enventos que acontecem na tela)
        cy.get('#alert').click().then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Alert Simples')
        })
    })

    it('Confirme', () => {
        // Por conta da sincronicidade do cypress, é possível inverter a ordem de click sem prejudicar o funcionamento do cypress.
        cy.on('window:confirm', msg => { // o on() pega enventos que acontecem na tela
            expect(msg).to.be.equal('Confirm Simples')
        })
        
        cy.on('window:alert', msg => { // o on() pega enventos que acontecem na tela
            expect(msg).to.be.equal('Confirmado')
        })
        cy.get('#confirm').click() 
    })

    it('Deny', () => {
        // Por conta da sincronicidade do cypress, é possível inverter a ordem de click sem prejudicar o funcionamento do cypress.
        cy.on('window:confirm', msg => { // o on() pega enventos que acontecem na tela
            expect(msg).to.be.equal('Confirm Simples')
            return false // Ao dar um return false, ao invés do cypress clicar em confirmar ele vai negar o alerta que aparecer na tela.
        })
        
        cy.on('window:alert', msg => { // o on() pega enventos que acontecem na tela
            expect(msg).to.be.equal('Negado')
        })
        cy.get('#confirm').click() 
    })

    it('Confirme', () => {
        // Por conta da sincronicidade do cypress, é possível inverter a ordem de click sem prejudicar o funcionamento do cypress.
        cy.window().then(win => {
            cy.stub(win, 'prompt').returns('42')
        })
        cy.on('window:confirm', msg => { // o on() pega enventos que acontecem na tela
            expect(msg).to.be.equal('Era 42')
        })
        
        cy.on('window:alert', msg => { // o on() pega enventos que acontecem na tela
            expect(msg).to.be.equal(':D')
        })
        cy.get('#prompt').click()
    
    })

    it('Validando mensagens', () => {
        const stub = cy.stub().as('alerta')
        cy.on('window:alert', stub)
        cy.get('#formCadastrar').click()
            .then(() => expect(stub.getCall(0)).to.be.calledWith('Nome eh obrigatorio'))

        cy.get('#formNome').type('Rodrigo')
        cy.get('#formCadastrar').click()
            .then(() => expect(stub.getCall(1)).to.be.calledWith('Sobrenome eh obrigatorio'))

        cy.get('[data-cy="dataSobrenome"]').type('Ramos')
        cy.get('#formCadastrar').click()
            .then(() => expect(stub.getCall(2)).to.be.calledWith('Sexo eh obrigatorio'))
        
        cy.get('#formSexoMasc').click()
        cy.get('#formCadastrar').click()

        cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado!')
    })

})