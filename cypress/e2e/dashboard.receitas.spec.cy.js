/// <references types="cypress"/>

let btnAdicionarReceita = '.sc-bBbNsw'
let textConfirmacaoCadastroReceita = '.Toastify__toast-body > :nth-child(2)'
let campoPesquisarReceita = '.sc-cwKisF'
let btnPesquisarReceita = '.sc-lltjXc'
let textDescricaoReceita = '.sc-ezGUZh'
let textConfirmacaoExclusao = '#\\33  > .Toastify__toast-body > :nth-child(2)'
let btnInicio = '[href="/sua-carteira"] > span'
let textTela = '.sc-bcPKhP'
let btnInvestimentos = '[href="/investimentos"] > span'
let btnMeusDados = '#root > div > header > div.navegacao > span'
let telaMeusDados = '#root > div > header > div.sc-ksJisA.dlBcrG > div > div > h3'
let btnLogo = 'a > img'
let btnSair = '.logout > span'
let btnDespesas = '[href="/despesas"] > span'
let textTelaAdicionarReceita = '.sc-hhWzdI > div > .sc-bcPKhP'
let textErroAdicionarReceita = '#\\31  > div.Toastify__toast-body > div:nth-child(2)'
let textInicio = '.sc-bcPKhP'
let btnVisualizarReceita = ':nth-child(1) > .sc-iJfdHH > [data-testid="logo-link-home"]'
let textMensagemErro = '.sc-idyqAC > .Toastify > .Toastify__toast-container > #\\31  > .Toastify__toast-body > :nth-child(2)'


describe('Dashboard Receitas', () => {
    
    beforeEach(() => {
        cy.visit("/")
        cy.generateFixture();
    })

    it('CT028 - Validar adicionar receita com sucesso', () => {
        cy.fixture('usuario.data.json').then(data => {
            cy.criarUsuarioELogarNoSistema(data.usuario[0].nomeCompleto, data.usuario[0].email, data.usuario[0].dataNascimento, data.usuario[0].cpf, data.usuario[0].senha)
            cy.navegarParaTelaDeReceita()
            cy.get(btnAdicionarReceita).click()
        })

        cy.fixture('transacao.data.json').then(data => {
            cy.cadastrarReceita(data.receita[0].valor, data.receita[0].descricao, data.receita[0].empresa, data.receita[0].banco)
            cy.get(textConfirmacaoCadastroReceita).should('contain', 'Receita adicionada com sucesso!')
        })
    })

    it('CT029 - Validar campo buscar uma receita com sucesso', () => {
        cy.fixture('usuario.data.json').then(data => {
            cy.efetuarLogin(data.usuario[0].email, data.usuario[0].senha, "Olá, " + data.usuario[0].nomeCompleto)
            cy.navegarParaTelaDeReceita()
        })
        cy.fixture('transacao.data.json').then(data => {
            cy.get(campoPesquisarReceita).type(data.receita[0].valor - 1)
            cy.get(btnPesquisarReceita).click()
            cy.get(textDescricaoReceita).should('contain', data.receita[0].descricao)
        })
    })
    
    it('CT031 - Validar excluir uma receita com sucesso', () => {
        cy.fixture('usuario.data.json').then(data => {
            cy.efetuarLogin(data.usuario[0].email, data.usuario[0].senha, "Olá, " + data.usuario[0].nomeCompleto)
            cy.navegarParaTelaDeReceita()
            cy.get(btnAdicionarReceita).click()          
        })
        cy.fixture('transacao.data.json').then(data => {
            cy.excluirReceita(data.receita[1].valor, data.receita[1].descricao, data.receita[1].empresa, data.receita[1].banco)
            cy.get(textConfirmacaoExclusao).should('contain', 'Transação excluída com sucesso!')
        })
    })

    it('CT041.1 - Validar botão "Início" na tela Receitas com sucesso', () => {
        cy.fixture('usuario.data.json').then(data => {
            cy.efetuarLogin(data.usuario[0].email, data.usuario[0].senha, "Olá, " + data.usuario[0].nomeCompleto)
            cy.navegarParaTelaDeReceita()
            cy.get(btnInicio).click();
            cy.get(textInicio).contains('Olá, ');    
        })
    })

    it('CT041.2 - Validar botão "Investimentos" na tela Receitas com sucesso', () => {
        cy.fixture('usuario.data.json').then(data => {
            cy.efetuarLogin(data.usuario[0].email, data.usuario[0].senha, "Olá, " + data.usuario[0].nomeCompleto)
            cy.navegarParaTelaDeReceita()
            cy.get(btnInvestimentos).click();
            cy.get(textTela).contains('INVESTIMENTOS');    
        })
    })

    it('CT044 - Validar botão Logo na tela Receitas com sucesso', () => {
        cy.fixture('usuario.data.json').then(data => {
            cy.efetuarLogin(data.usuario[0].email, data.usuario[0].senha, "Olá, " + data.usuario[0].nomeCompleto)
            cy.navegarParaTelaDeReceita()
            cy.get(btnLogo).click();
            cy.url().should('eq', 'https://wallet-life.vercel.app/')
        })
    })

    it('CT057 - Validar botão "Meus dados" na tela Receitas com sucesso', () => {
        cy.fixture('usuario.data.json').then(data => {
            cy.efetuarLogin(data.usuario[0].email, data.usuario[0].senha, "Olá, " + data.usuario[0].nomeCompleto)
            cy.navegarParaTelaDeReceita()
            cy.get(btnMeusDados).click()
            cy.get(telaMeusDados).contains("VISUALIZAR DADOS")
        })
    })

    it('CT058 - Validar botão "Sair" na tela Receitas com sucesso', () => {
        cy.fixture('usuario.data.json').then(data => {
            cy.efetuarLogin(data.usuario[0].email, data.usuario[0].senha, "Olá, " + data.usuario[0].nomeCompleto)
            cy.navegarParaTelaDeReceita()
            cy.get(btnSair).click();
            cy.url().should('eq', 'https://wallet-life.vercel.app/')
        })
    })

    it('CT059 - Validar botão "Despesas" na tela Receitas com sucesso', () => {
        cy.fixture('usuario.data.json').then(data => {
            cy.efetuarLogin(data.usuario[0].email, data.usuario[0].senha, "Olá, " + data.usuario[0].nomeCompleto)
            cy.navegarParaTelaDeReceita()
            cy.get(btnDespesas).click();
            cy.get(textTela).contains('DESPESAS');    
        })
    })   

    it('CT066 - Validar cadastrar nova Receita com campo valor zerado', () => {

        const numeroZerado = {
            'valor': 0
        }

        cy.fixture('usuario.data.json').then(data => {
            cy.efetuarLogin(data.usuario[0].email, data.usuario[0].senha, "Olá, " + data.usuario[0].nomeCompleto)
            cy.navegarParaTelaDeReceita()
            cy.get(btnAdicionarReceita).click() 
        })
        cy.fixture('transacao.data.json').then(data => {
            cy.cadastrarReceita(numeroZerado.valor, data.receita[0].descricao, data.receita[0].empresa, data.receita[0].banco)
            cy.get(textConfirmacaoCadastroReceita).should('contain', 'Receita inválida!')
        })
    })

    it('CT068 - Validar Cadastrar receita com valor negativo', () => {
        cy.fixture('usuario.data.json').then(data => {
            cy.efetuarLogin(data.usuario[0].email, data.usuario[0].senha, "Olá, " + data.usuario[0].nomeCompleto)
            cy.navegarParaTelaDeReceita()
            cy.get(btnAdicionarReceita).click() 
        })

        cy.fixture('transacao.data.json').then(data => {
            cy.cadastrarReceita(-10, data.receita[0].descricao, data.receita[0].empresa, data.receita[0].banco)
            cy.get(telaErroAdicionarReceita).should('contain', 'Adicionar Receita')
            cy.get(textErroAdicionarReceita).contains('Receita inválida!')
        })
    })

    
    it('CT073.1 - Validar atualizar receita com valor negativo', () => {
        cy.fixture('usuario.data.json').then(data => {
            cy.efetuarLogin(data.usuario[0].email, data.usuario[0].senha, "Olá, " + data.usuario[0].nomeCompleto)
            cy.navegarParaTelaDeReceita()
            cy.get(btnAdicionarReceita).click()
        })

        cy.fixture('transacao.data.json').then(data => {
            cy.cadastrarReceita(data.receita[0].valor, data.receita[0].descricao, data.receita[0].empresa, data.receita[0].banco)
            cy.get(textConfirmacaoCadastroReceita).should('contain', 'Receita adicionada com sucesso!')
            cy.get(btnVisualizarReceita).click()
            cy.atualizarReceita(-10, data.receita[0].descricao, data.receita[0].empresa, data.receita[0].banco)
            cy.get(textConfirmacaoCadastroReceita).should('contain', 'Valor inválido!')
        })
    })
    
    it('CT073.2 - Validar atualizar Receita sem valor', () => {
        cy.fixture('usuario.data.json').then(data => {
            cy.efetuarLogin(data.usuario[0].email, data.usuario[0].senha, "Olá, " + data.usuario[0].nomeCompleto)
            cy.navegarParaTelaDeReceita()
        })
        cy.fixture('transacao.data.json').then(data => {
            cy.get(btnVisualizarReceita).click()
            cy.atualizarReceitaSemValor(data.receita[0].descricao, data.receita[0].empresa, data.receita[0].banco)
            cy.get(textMensagemErro).contains('É necessário preencher todos os campos!')
        })
    })

    it('CT073.3 - Validar atualizar Receita sem descrição', () => {
        cy.fixture('usuario.data.json').then(data => {
            cy.efetuarLogin(data.usuario[0].email, data.usuario[0].senha, "Olá, " + data.usuario[0].nomeCompleto)
            cy.navegarParaTelaDeReceita()
        })
        cy.fixture('transacao.data.json').then(data => {
            cy.get(btnVisualizarReceita).click()
            cy.atualizarReceitaSemDescricao(data.receita[0].valor, data.receita[0].empresa, data.receita[0].banco)
            cy.get(textMensagemErro).contains('É necessário preencher todos os campos!')
        })
    })

    it('CT073.4 - Validar atualizar Receita sem empresa', () => {
        cy.fixture('usuario.data.json').then(data => {
            cy.efetuarLogin(data.usuario[0].email, data.usuario[0].senha, "Olá, " + data.usuario[0].nomeCompleto)
            cy.navegarParaTelaDeReceita()
        })
        cy.fixture('transacao.data.json').then(data => {
            cy.get(btnVisualizarReceita).click()
            cy.atualizarReceitaSemEmpresa(data.receita[0].valor, data.receita[0].descricao, data.receita[0].banco)
            cy.get(textMensagemErro).contains('É necessário preencher todos os campos!')
        })
    })

    it('CT073.5 - Validar atualizar Receita sem banco', () => {
        cy.fixture('usuario.data.json').then(data => {
            cy.efetuarLogin(data.usuario[0].email, data.usuario[0].senha, "Olá, " + data.usuario[0].nomeCompleto)
            cy.navegarParaTelaDeReceita()
        })
        cy.fixture('transacao.data.json').then(data => {
            cy.get(btnVisualizarReceita).click()
            cy.atualizarReceitaSemBanco(data.receita[0].valor, data.receita[0].descricao, data.receita[0].empresa)
            cy.get(textMensagemErro).contains('É necessário preencher todos os campos!')
        })
    })

    it('CT073.6 - Validar atualizar Receita com descrição menor que 5 caracteres', () => {
        cy.fixture('usuario.data.json').then(data => {
            cy.efetuarLogin(data.usuario[0].email, data.usuario[0].senha, "Olá, " + data.usuario[0].nomeCompleto)
            cy.navegarParaTelaDeReceita()
        })
        cy.fixture('transacao.data.json').then(data => {
            cy.get(btnVisualizarReceita).click()
            cy.atualizarReceita(data.receita[0].valor, data.receita[0].descricao.slice(0,3), data.receita[0].empresa, data.receita[0].banco)
            cy.get(textMensagemErro).contains('É necessário preencher todos os campos!')
        })
    })

    it('CT074 - Validar atualizar receita com sucesso', () => {
        cy.fixture('usuario.data.json').then(data => {
            cy.efetuarLogin(data.usuario[0].email, data.usuario[0].senha, "Olá, " + data.usuario[0].nomeCompleto)
            cy.navegarParaTelaDeReceita()
        })

        cy.fixture('transacao.data.json').then(data => {
            cy.get(btnVisualizarReceita).click()
            cy.atualizarReceita(data.receita[1].valor, data.receita[1].descricao, data.receita[1].empresa, data.receita[1].banco)
            cy.get(textDescricaoReceita).should('contain', data.receita[1].descricao)
        })
    })
})