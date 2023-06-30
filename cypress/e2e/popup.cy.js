/// <reference types="cypress" />

describe('Work with iFrames', () => {
    // before(() => {});

    it('Deve testar popup diretamente', () => {
        cy.visit('https://wcaquino.me/cypress/frame.html');
        cy.get('#otherButton').click()
        cy.on('window:alert', msg => {
            expect(msg).to.be.equal('Click OK!')
        })
    })

    it('Deve verificar se o popup foi invocado', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html');
        cy.window().then(win => {
            cy.stub(win, 'open').as('winOpen')  // o médoto open vai abrir o popup
        })
        cy.get('#buttonPopUp').click()
        cy.get('@winOpen').should('be.called') // para o cypress entender que o elemento à ser buscado é um alias, deve ser colocado um @ no começo da palavra.
    })

    describe.only('With links...', () => {
        beforeEach(() => {
            cy.visit('https://wcaquino.me/cypress/componentes.html')
        })

        it('Check popup url', () => {
            cy.contains('Popup2')
                .should('have.prop', 'href') // aqui ele irá retornar a propriedade.
                .and('equal', 'https://wcaquino.me/cypress/frame.html')
        })

        it('Should access popup dinamically', () => {
            cy.contains('Popup2').then($a => {
                console.log($a)
                const href = $a.prop('href') // Aqui ele obtem o link do elemento
                cy.visit(href)
                cy.get('#tfield').type('funciona')
            })
        })

        it('Should force link on same page', () => {
            cy.contains('Popup2')
                .invoke('removeAttr', 'target') // a função removeAttr() vai remover o target _blanck deixando o target padrão de abrir link na mesma página.
                .click()
        })
    })
})

