
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

    context('quando o usuário é novato', () => {
        const user = {
            name: "George Mathias",
            email: "a@gmail.com",
            pass: "pwd123"
        }

        before(() => {

            cy.task('removeUser', user.email)
                .then((result) => {
                    Object.keys(result).forEach((resulta) => {
                        cy.log('result:', resulta);
                    })
                })
        });

        it(`Dado que quero cadastrar um novo usuário
            Quando enviar o formulário com dados válidos
            Então deve cadastrar o usuário
            E deve exibir uma mensagem de sucesso`, () => {

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

            cy.get('input[placeholder^="Nome"]').type(user.name)
            cy.get('input[placeholder$="email"]').type(user.email)
            cy.get('input[placeholder*="senha"]').type(user.pass)

            cy.contains("button", "Cadastrar").click()

            cy.get('.toast')
                .should('be.visible')
                .find('p')
                .should('have.text', 'Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')
        })
    });


    context('deve exibir email já cadastrado', () => {
        const user = {
            name: "George Mathias",
            email: "a@gmail.com",
            password: "pwd123",
            is_provider: true
        }

        before(() => {
            cy.task('removeUser', user.email)
                .then((result) => {
                    Object.keys(result).forEach((resulta) => {
                        cy.log('result:', resulta);
                    })
                })

            cy.request(
                'POST',
                'http://localhost:3333/users',
                user
            ).then(function (response) {
                cy.log('res', response.status)
                expect(response.status).to.eq(200)
            })
        });

        it(`Dado que quero cadastrar um novo usuário
            Quando enviar o formulário com dados válidos
            Então não deve realizar o cadastrar
            E deve exibir uma mensagem email já cadastrado`, () => {

            cy.visit("/signup")

            cy.contains('h1', "Faça seu cadastro")
                .should('have.text', 'Faça seu cadastro')

                cy.get('input[placeholder^="Nome"]').type(user.name) // começa com
                cy.get('input[placeholder$="email"]').type(user.email) // termina com
                cy.get('input[placeholder*="senha"]').type(user.password) // contém

            cy.contains("button", "Cadastrar").click()

            cy.get('.toast')
                .should('be.visible')
                .find('p')
                .should('have.text', 'Email já cadastrado para outro usuário.')
        })
    });
});
