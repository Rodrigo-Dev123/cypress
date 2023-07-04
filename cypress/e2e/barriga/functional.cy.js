/// <reference types="cypress" />

describe('should test at a functional level', () => {
    beforeEach(() => {
        cy.visit('https://barrigareact.wcaquino.me/')
        cy.get('.input-group > .form-control').type('rodrigodevjavascript@gmail.com')
        cy.get(':nth-child(2) > .form-control').type('cypress')
        cy.get('.btn').click()
        cy.get('.toast-message').should('contain', 'Bem vindo')
    });

    it('Should create an account', () => {
        cy.get('[data-test="menu-settings"] > .fas').click()
        cy.get('[href="/contas"]').click()
        cy.get('[data-test="nome"]').type('Conta de teste')
        cy.get('.btn').click()
        cy.get('.toast-message').should('contain', 'Conta inserida com sucesso')

    })
})