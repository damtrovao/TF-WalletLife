/// <reference types="cypress"/>

describe('Validar botão receitas em investimentos com sucesso', () => {

    beforeEach(() => {
        cy.visit("/")
    });
  
    it('Validar botão receitas em investimentos com sucesso', () => {
      cy.get('#root > div > header > div > a:nth-child(2) > button').click()// clicar em login
      cy.fixture('usuario.data.json').then(data => {
        cy.efetuarLogin(data.email, data.senha)
      })
      cy.url().should('eq', 'https://wallet-life.vercel.app/sua-carteira') // Verificar pagina sua carteira 
      cy.get('#root > div > header > div > a:nth-child(4)').click() // clicar em investimentos 
      cy.url().should('eq', 'https://wallet-life.vercel.app/investimentos') // Verificar pagina investimentos 
      cy.get('#root > div > header > div > a:nth-child(2)').click() // clicar em receitas
      cy.url().should('eq', 'https://wallet-life.vercel.app/receitas') // verificar receitas
    })
  
  })