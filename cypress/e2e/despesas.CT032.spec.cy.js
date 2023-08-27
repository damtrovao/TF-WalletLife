/// <references types="cypress"/>

describe('Botão "+"', () => {
    
    beforeEach(() => {
        cy.visit("/login")
    })

    it('validar botão "+" com sucesso', () => {
        cy.fixture('usuario.data.json').then(data => {
// 
// 
// 
            cy.efetuarLogin("larissa@teste.com", "123321")
            cy.get('#root > div > header > div.navegacao > a:nth-child(3)').click()
            cy.get('#root > div > section > div.sc-bjEwCx.kUwoQp > div > button').click()
            cy.get('#root > div > div > div > div > h3').contains('ADICIONAR TRANSAÇÃO')
        })
    })
})