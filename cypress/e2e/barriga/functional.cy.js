/// <reference types="cypress" />

import loc from '../../support/locators';
import '../../support/commandsContas';

describe('should test at a functional level', () => {
    beforeEach(() => {
        cy.login('rodrigodevjavascript@gmail.com', 'cypress')
        // cy.viewport(1440, 900)
    })
    
    it('Should create an account', () => {
        cy.resetApp()
        cy.acessarMenuConta()
        cy.inserirConta('Conta de teste')
        cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso')
    })
    
    it('Should update an account', () => {
        cy.acessarMenuConta()
        cy.xpath(loc.CONTAS.FN_XP_BNT_ALTERAR('Conta de teste')).click()
        cy.get(loc.CONTAS.NOME)
            .clear()
            .type('Conta alterada')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'Conta atualizada com sucesso')
    })

    it('Should not create an acount with same name', () => {
        cy.acessarMenuConta()
        cy.inserirConta('Conta alterada')
        cy.get(loc.MESSAGE).should('contain', 'code 400')
    })

    it('should create a transaction', () => {
        cy.get(loc.MENU.MOVIMENTACAO).click()
        cy.get(loc.MOVIMENTACAO.DESCRICAO).type('Desc')
        cy.get(loc.MOVIMENTACAO.VALOR).type('123')
        cy.get(loc.MOVIMENTACAO.INTERESSADO).type('Inter')
        cy.get(loc.MOVIMENTACAO.CONTA).select('Conta alterada')
        cy.get(loc.MOVIMENTACAO.STATUS).click()
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'sucesso')

        cy.get(loc.EXTRATO.LINHAS).should('have.length', 7)

        cy.xpath(loc.EXTRATO.FN_XP_BUSCA_ELEMENTO('Desc', '123')).should('exist')
    })

    it('Should get balance', () => {
        cy.get(loc.MENU.HOME).click()
        cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Conta alterada')).should('contain', '123,00')
    })

    it('Should remove a transition', () => {
        cy.get(loc.MENU.EXTRATO).click()
        cy.xpath(loc.EXTRATO.FN_XP_REMOVER_ELEMENTO('Desc')).click()
        cy.get(loc.MESSAGE).should('contain', 'sucesso')
    })
})