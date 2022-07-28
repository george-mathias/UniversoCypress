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
            signUpPage.toast.shouldHaveTest('Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')
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
            cy.postUser(user)
        });

        it(`Dado que quero cadastrar um novo usuário
            Quando enviar o formulário com dados válidos
            Então não deve realizar o cadastrar
            E deve exibir uma mensagem email já cadastrado`, () => {

            signUpPage.go()
            signUpPage.form(user)
            signUpPage.submit()
            signUpPage.toast.shouldHaveTest('Email já cadastrado para outro usuário.')
        })
    });

    context('quando o email já existe', () => {
        const user = {
            name: "Elizabeth Olsen",
            email: "liza.yahoo.com",
            password: "pwd123"
        }

        it('deve exibir mensagem de alerta', () => {
            signUpPage.go()
            signUpPage.form(user)
            signUpPage.submit()
            signUpPage.alertHaveText('Informe um email válido')
        });
    });

    context('quando a senha é muito curta', () => {

        const passwords = ['1', '2a', 'ab3', 'abc4', 'ab#c5']

        beforeEach(() => {
            signUpPage.go()
        })

        passwords.forEach(p => {
            it(`não deve cadastrar com a senha ${p}`, () => {
                const user = { name: 'Jason Friday', email: 'jason@gmail.com', password: p }

                signUpPage.form(user)
                signUpPage.submit()
            });    
        })

        afterEach(() => {
            signUpPage.alertHaveText('Pelo menos 6 caracteres')
        })
    });

    context('quando não preencho nenhum dos campos', () => {
        
        const alertMessages = [
            'Nome é obrigatório',
            'E-mail é obrigatório',
            'Senha é obrigatória'
        ]

        before(() => {
            signUpPage.go()
            signUpPage.submit()
        });

        alertMessages.forEach((alert) => {
            it.only(`deve exibir ${alert.toLocaleLowerCase()}`, () => {
                signUpPage.alertHaveText(alert)
            });
        })
    });
});
