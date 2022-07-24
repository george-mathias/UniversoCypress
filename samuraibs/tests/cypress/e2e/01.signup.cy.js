// não faz parte do treinamento
// const selectors = {
//     input: {
//         name: 'input[placeholder="Nome"]',
//         email: 'input[placeholder="E-mail"]',
//         pass: 'input[placeholder="Senha"]'
//     },
//     dados: {
//         name: "George Mathias",
//         email: "fulano@gmail.com",
//         pass: "abc123"
//     }
// }

describe('cadastro', () => {
    it(`Dado que quero cadastrar um novo usuário
    Quando enviar o formulário com dados válidos
    Então devo ver a mensagem `, () => {

        const name = 'George Mathias', email = 'a@gmail.com', pass = 'pwd123'

        cy.task('removeUser', email)
            .then((result) => {
                Object.keys(result).forEach((resulta) => {
                    cy.log('result:', resulta);
                })
            })

        cy.visit("/")

        cy.contains("a", "Criar conta")
            .click()

        cy.contains('h1', "Faça seu cadastro")
            .should('have.text', 'Faça seu cadastro')

        // não faz parte do treinamento
        // Object.keys(selectors.input).forEach((selector) => {
        //     cy.get(selectors.input[selector])
        //         .should('be.visible')
        //         .type(selectors.dados[selector])
        // }) 

        cy.get('input[placeholder="Nome"]').type(name)
        cy.get('input[placeholder="E-mail"]').type(email)
        cy.get('input[placeholder="Senha"]').type(pass)

        cy.contains("button", "Cadastrar").click()

        cy.get('.toast')
            .should('be.visible')
            .find('p')
            .should('have.text', 'Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')
    })
    it(`Dado que quero validar a mensagem de email já cadastrado
    Quando enviar o formulário com email a@gmail.com
    Então deve exibir email já cadastrado `, () => {

        const name = 'George Mathias', email = 'a@gmail.com', pass = 'pwd123'

        cy.visit("/")

        cy.contains("a", "Criar conta")
            .click()

        cy.contains('h1', "Faça seu cadastro")
            .should('have.text', 'Faça seu cadastro')

        cy.get('input[placeholder="Nome"]').type(name)
        cy.get('input[placeholder="E-mail"]').type(email)
        cy.get('input[placeholder="Senha"]').type(pass)

        cy.contains("button", "Cadastrar").click()

        cy.get('.toast')
            .should('be.visible')
            .find('p')
            .should('have.text', 'Email já cadastrado para outro usuário.')
    })
});
