/// <reference types="cypress" />

describe('Work with basic elements', () => {
    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html');
    });

    beforeEach(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html'); // O beforeEach permite execultar antes de cada teste.
        cy.reload();
    })
    it('Text', () => {
        cy.get('body').should('contain', 'Cuidado');
        // cy.get('body').should('have.text', 'Cuidado');
        cy.get('span').should('contain', 'Cuidado');
        cy.get('.facilAchar').should('contain', 'Cuidado');
        cy.get('.facilAchar').should('have.text', 'Cuidado onde clica, muitas armadilhas...'); // O (have não aceita texto incompleto).
    });

    it('Links', () => {
        cy.get('[href="#"]').click();
        cy.get('#resultado').should('have.text', 'Voltou!');

        cy.reload();
        cy.get('#resultado').should('have.not.text', 'Voltou!');
        cy.contains('Voltar').click();
        cy.get('#resultado').should('have.text', 'Voltou!')        
    })

    it('TextFields', () => {
        cy.get('#formNome').type('Cypress Test');
        cy.get('#formNome').should('have.value', 'Cypress Test');

        cy.get('#elementosForm\\:sugestoes') // Em ID com : pontos é recomendado o uso de duas barras invertidas para ignorar os :
            .type('textarea')
            .should('have.value', 'textarea')

        cy.get('#tabelaUsuarios > :nth-child(2) > :nth-child(1) > :nth-child(6) > input')
            .type('???');
            
        cy.get('[data-cy="dataSobrenome"]')
            .type('Teste12345{backspace}{backspace}') // A tecla {backspace} tem a função de apagar um caractere apenas.
            .should('have.value', 'Teste123')
            
        cy.get('#elementosForm\\:sugestoes') // Em ID com : pontos é recomendado o uso de duas barras invertidas para ignorar os :
            .clear()
            .type('Erro{selectall}acerto', { delay: 100 }) // A tecla {selectall} apaga todos os caracteres atrás dela.
            .should('have.value', 'acerto')
                
    });

    it('RadioButton', () => {
        cy.get('#formSexoFem')
            .click()
            .should('be.checked');
        
        cy.get('#formSexoMasc').should('not.be.checked');

        cy.get('[name="formSexo"]').should('have.length', 2);
    });

    it('Checkbox', () => {
        cy.get('#formComidaPizza')
            .click()
            .should('be.checked');

        cy.get('[name="formComidaFavorita"]').click({ multiple: true });
        cy.get('#formComidaPizza').should('not.be.checked');
        cy.get('#formComidaVegetariana').should('be.checked')
    })

    it('Combo', () => {
        cy.get('[data-test="dataEscolaridade"]')
        .select('2o grau completo')  // Para selecionar, ele aceita o texto visível e o atributo da opção à ser escolhida.
        .should('have.value', '2graucomp') // Para a verificação do value ele só aceita o atriubuto value.

        cy.get('[data-test="dataEscolaridade"] option')
            .should('have.length', 8);

        cy.get('[data-test="dataEscolaridade"] option').then(arr => {
            const values = [];
            arr.each(function() {
                values.push(this.innerHTML)
            })
            expect(values).to.include.members(["Superior", "Mestrado"])
        })
    })

    it.only('Combo multiplo', () => {
        cy.get('[data-testid="dataEsportes"]')
            .select(['natacao', 'Corrida', 'nada']); // Para selecionar vários no combo múltiplo é necessario passar os atributos do value para o select()
        // cy.get('[data-testid="dataEsportes"]').should('have.value', ['natacao', 'Corrida', 'nada']) // o should não funcionou bem nesta assertiva.
        cy.get('[data-testid="dataEsportes"]').then($el => {
            expect($el.val()).to.be.deep.equal(['natacao', 'Corrida', 'nada'])  // A função val() sem receber o parâmetro acaba tendo a função de capturar o valor do elemento.
            expect($el.val()).to.have.length(3)
        })

        cy.get('[data-testid="dataEsportes"]')
            .invoke('val').should('eql', ['natacao', 'Corrida', 'nada']) // o eql tem a mesma função do deep equal



        //TODO validar opções selecionadas do combo multiplo
    })

});
