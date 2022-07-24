import signUpPage from '../support/pages/signup'

describe('cadastro', () => {

    context('quando o usuário é novato', () => {
        const user = {
            name: "George Mathias",
            email: "a@gmail.com",
            password: "pwd123"
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

            signUpPage.go()
            signUpPage.form(user)
            signUpPage.submit()
            signUpPage.toastHaveText('Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')
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

                signUpPage.go()
                signUpPage.form(user)
                signUpPage.submit()
                signUpPage.toastHaveText('Email já cadastrado para outro usuário.')
        })
    });
});
