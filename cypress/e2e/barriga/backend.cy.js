/// <reference types="cypress" />

describe('should test at a functional level', () => {
    let token
    before(() => {
        cy.getToken('rodrigodevjavascript@gmail.com', 'cypress').then(tkn => {
            token = tkn;
        })
    })
    beforeEach(() => {
        cy.resetRest()
    })

    it('Should create an account', () => {
        cy.request({
            url: 'https://barrigarest.wcaquino.me/contas',
            method: 'POST',
            headers: { Authorization: `JWT ${token}` },
            body: {
                nome: 'Conta via reset'
            }
        }).as('response')


        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(201)
            expect(res.body).to.have.property('id')
            expect(res.body).to.have.property('nome', 'Conta via reset')
        })
    })

    it('Should update an account', () => {

    })

    it('Should not create an acount with same name', () => {

    })

    it('should create a transaction', () => {

    })

    it('Should get balance', () => {

    })

    it('Should remove a transition', () => {

    })
})