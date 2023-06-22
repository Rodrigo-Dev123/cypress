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

        cy.title().then(title => { // Tanto o then() quanto o should() tratam as promises.
            console.log(title)
        })

        //TODO imprimir o title no console
        //TODO escrever o title em um campo de texto
    });

    it('Should find and interact with an element', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html');
        cy.get('#buttonSimple')
            .click()
            .should('have.value', 'Obrigado!');
    })
});