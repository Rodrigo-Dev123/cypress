/// <reference types="cypress" />

describe('Cypress basics', () => {
    it.only('Should visit a page and assert title', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html');

        // const title = cy.tytle();
        // console.log(title)

        cy.title().should('be.equal', 'Campo de Treinamento'); // A função should vai esperar até o tempo final do cypress para receber o valor.
        cy.title().should('contain', 'Campo');

        // cy.pause();

        cy.title()
            .should('be.equal', 'Campo de Treinamento')
            .and('contain', 'Campo');

        let syncTitle

        cy.title().then(title => { // Tanto o then() quanto o should() tratam as promises.
            console.log(title)

            cy.get('#formNome').type(title)

            syncTitle = title

        })

        cy.get('[data-cy="dataSobrenome"]').then(el => {
            el.val(syncTitle)
        })

        cy.get('#elementosForm\\:sugestoes').then(el => {   // Como exitem dois pontos é necessaário usar duas barras para o cypress poder ignorar
            cy.wrap(el).type(syncTitle);
        })

    
    });

    it('Should find and interact with an element', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html');
        cy.get('#buttonSimple')
            .click()
            .should('have.value', 'Obrigado!');
    })
});