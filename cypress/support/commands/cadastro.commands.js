let campoNome = '#name'
let campoEmail = '#email'


Cypress.Commands.add('cadastrarUsuario', (nome,email,dataNascimento,cpf,senha) => {    
    cy.get(campoNome).type(nome)
    cy.get(campoEmail).type(email)
    cy.get('#dateBith').type(dataNascimento)
    cy.get('#cpf').type(cpf)
    cy.get('#password').type(senha)
    cy.get('.sc-jSwlEQ').click()
})

Cypress.Commands.add('cadastrarUsuarioSemNome', (email,dataNascimento,cpf,senha) => {    
    cy.get(campoEmail).type(email)
    cy.get('#dateBith').type(dataNascimento)
    cy.get('#cpf').type(cpf)
    cy.get('#password').type(senha)
    cy.get('.sc-jSwlEQ').click()
})

Cypress.Commands.add('cadastrarUsuarioSemEmail', (nome, dataNascimento, cpf, senha) => {    
    cy.get(campoNome).type(nome)
    cy.get('#dateBith').type(dataNascimento)
    cy.get('#cpf').type(cpf)
    cy.get('#password').type(senha)
    cy.get('.sc-jSwlEQ').click()
})

Cypress.Commands.add('cadastrarUsuarioSemDataNascimento', (nome,email,cpf,senha) => {    
    cy.get(campoNome).type(nome)
    cy.get('#email').type(email)
    cy.get('#cpf').type(cpf)
    cy.get('#password').type(senha)
    cy.get('.sc-jSwlEQ').click()
})

Cypress.Commands.add('cadastrarUsuarioSemCpf', (nome,email,dataNascimento,senha) => {    
    cy.get(campoNome).type(nome)
    cy.get('#email').type(email)
    cy.get('#dateBith').type(dataNascimento)
    cy.get('#password').type(senha)
    cy.get('.sc-jSwlEQ').click()
})

Cypress.Commands.add('cadastrarUsuarioSemSenha', (nome,email,dataNascimento,cpf) => {    
    cy.get(campoNome).type(nome)
    cy.get('#email').type(email)
    cy.get('#dateBith').type(dataNascimento)
    cy.get('#cpf').type(cpf)
    cy.get('.sc-jSwlEQ').click()
})

Cypress.Commands.add('clicarBotaoLoginTelaCadastro', () => {
    cy.get('#root > main > form > span > strong > a').click()
})

Cypress.Commands.add('clicarBotaoLogoTelaCadastro', () => {
    cy.get('#root > main > div.header > a').click()
})