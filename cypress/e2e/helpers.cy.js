/// <reference types="cypress" />

// O cy.wrap() é usado em coisas que não estão encapsuladas no cypress que é o caso do obj e o elemento do jquery.

describe('Helpers...', () => {
    it('Wrap', () => {
        const obj = { nome: 'User', idade: 20 }
        expect(obj).to.have.property('nome')
        cy.wrap(obj).should('have.property', 'nome')  // O object não tem a função should() atrelada à ele e por isso usamos o cy.wrap() 

        cy.visit('https://wcaquino.me/cypress/componentes.html');
        // cy.get('#formNome').then($el => {
        //     // $el.val('funcioana via jquery')
        //     cy.wrap($el).type('funciona via cypress')
        // })

        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(10)
            }, 500)
        })

        cy.get('#buttonSimple').then(() => console.log('Encontrei o primeiro botão'))
        // promise.then(num => console.log(num))
        cy.wrap(promise).then(num => console.log(num))
        cy.get('#buttonList').then(() => console.log('Encontrei o segundo botão'))

        cy.wrap(1).then(num => {
            return 2
        }).should('be.equal', 2)
    })

    it('Its...', () => {   // O its() tem como função pegar uma propriedade de algum objeto que esteja encadeado com o cypress.
        const obj = { nome: 'User', idade: 20 }
        cy.wrap(obj).should('have.property', 'nome', 'User')
        cy.wrap(obj).its('nome').should('be.equal', 'User')

        const obj2 = { nome: 'User', idade: 20, endereco: { rua: 'dos bobos' } }
        cy.wrap(obj2).its('endereco.rua').should('contain', 'bobos')

        cy.visit('https://wcaquino.me/cypress/componentes.html');
        cy.title().its('length').should('be.equal', 20)
    })

    it.only('Invoke...', () => {   // O invoke serve para invocar uma fução que esteja encadeada com o cypress.
        const getValue = () => 1;
        const soma = (a, b) => a + b;

        cy.wrap({ fn: getValue }).invoke('fn').should('be.equal', 1)
        cy.wrap({ fn: soma }).invoke('fn', 2, 5).should('be.equal', 7)

        cy.visit('https://wcaquino.me/cypress/componentes.html');
        cy.get('#formNome').invoke('val', 'Texto via invoke')   // Como este é um elemento do jquery, o val() do jquery por ser uma função pode ser execultado pelo invoke()
        cy.window().invoke('alert', 'Dá pra ver?')
        cy.get('#resultado')
            .invoke('html', '<input type="button", value="hacked"/>')
    })
})