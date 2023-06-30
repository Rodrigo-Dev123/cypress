/// <reference types="cypress" />

describe('Work with basic elements', () => {
    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html');
    });

    beforeEach(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html'); // O beforeEach permite execultar antes de cada teste.
        cy.reload();
    })

    it('Using jquery selector', () => {
        cy.get(':nth-child(1) > :nth-child(3) > [type="button"]')
        cy.get('table#tabelaUsuarios tbody > tr:eq(0) td:nth-child(3) > input').click()
        cy.get('[onclick*=\'Francisco\']') // o * serve para saber e o atributo contém o seguinte elemento, e as barras ivertidas servem como carectere de escape para as aspas.
        cy.get("[onclick*='Francisco']")  // Ou ao invés da barra, também podemos usar as aspas duplas para diferenciar das aspas simples.
        cy.get('#tabelaUsuarios td:contains(\'Doutorado\'):eq(0) ~ td:eq(3) > input')
        cy.get('#tabelaUsuarios tr:contains(\'Doutorado\'):eq(0) td:eq(6) input')
    })

    it('using xpath', () => {
        cy.xpath('//input[contains(@onclick, \'Francisco\')]');
        cy.xpath("//table[@id='tabelaUsuarios']//td[contains(., 'Francisco')]/..//input[@type='text']");
        cy.xpath("//td[contains(., 'Usuario A')]/following-sibling::td[contains(., 'Mestrado')]/..//input[@type='text']").type('Funciona');
    })
})