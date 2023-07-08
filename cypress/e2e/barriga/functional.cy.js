/// <reference types="cypress" />

import loc from '../../support/locators';
import '../../support/commandsContas';

describe('should test at a functional level', () => {
    before(() => {
        cy.login('rodrigodevjavascript@gmail.com', 'cypress')
        cy.resetApp()
    })
    
    it('Should create an account', () => {
        cy.acessarMenuConta()
        cy.inserirConta('Conta de teste')
        cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso')
    })
    
    it('Should update an account', () => {
        cy.login('rodrigodevjavascript@gmail.com', 'cypress')
        cy.acessarMenuConta()
        cy.xpath(loc.CONTAS.XP_BNT_ALTERAR).click()
        cy.get(loc.CONTAS.NOME)
            .clear()
            .type('Conta alterada')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'Conta atualizada com sucesso')
    })

    it('Should not create an acount with same name', () => {
        cy.login('rodrigodevjavascript@gmail.com', 'cypress')
        cy.acessarMenuConta()
        cy.inserirConta('Conta alterada')
        // cy.get(loc.CONTAS.NOME).type('Conta alterada')
        // cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'code 400')
    })

    it('should create a transaction', () => {
        cy.login('rodrigodevjavascript@gmail.com', 'cypress')
        cy.get(loc.MENU.MOVIMENTACAO).click()
        cy.get(loc.MOVIMENTACAO.DESCRICAO).type('Desc')
        cy.get(loc.MOVIMENTACAO.VALOR).type('123')
        cy.get(loc.MOVIMENTACAO.INTERESSADO).type('Inter')
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'sucesso')

        cy.get('.list-group > li').should('have.length', 7)

        cy.xpath("//span[contains(., 'Desc')]/following-sibling::small[contains(., '123')]").should('exist')
    })
})