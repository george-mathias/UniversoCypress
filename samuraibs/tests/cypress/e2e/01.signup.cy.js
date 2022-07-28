import signUpPage from '../support/pages/signup'

describe('cadastro', () => {

    before(() => {
        cy.fixture('signup').then(function (signup) {
            this.success = signup.success
            this.email_duplicado = signup.email_duplicado
            this.email_invalido = signup.email_invalido
            this.short_password = signup.short_password
        })
    });

    context('quando o usuário é novato', () => {

        before(function () {

            cy.task('removeUser', this.email_duplicado.email)
                .then((result) => {
                    Object.keys(result).forEach((resulta) => {
                        cy.log('result:', resulta);
                    })
                })
        });

        it(`Dado que quero cadastrar um novo usuário
            Quando enviar o formulário com dados válidos
            Então deve cadastrar o usuário
            E deve exibir uma mensagem de sucesso`, function () {

            signUpPage.go()
            signUpPage.form(this.email_duplicado)
            signUpPage.submit()
            signUpPage.toast.shouldHaveText('Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')
        })
    });

    context('deve exibir email já cadastrado', () => {

        before(function () {
            cy.postUser(this.email_duplicado)
        });

        it(`Dado que quero cadastrar um novo usuário
            Quando enviar o formulário com dados válidos
            Então não deve realizar o cadastrar
            E deve exibir uma mensagem email já cadastrado`, function () {

            signUpPage.go()
            signUpPage.form(this.email_duplicado)
            signUpPage.submit()
            signUpPage.toast.shouldHaveText('Email já cadastrado para outro usuário.')
        })
    });

    context('quando o email já existe', () => {

        it('deve exibir mensagem de alerta', function () {
            signUpPage.go()
            signUpPage.form(this.email_invalido)
            signUpPage.submit()
            signUpPage.alert.haveText('Informe um email válido')
        });
    });

    context('quando a senha é muito curta', () => {

        const passwords = ['1', '2a', 'ab3', 'abc4', 'ab#c5']

        beforeEach(() => {
            signUpPage.go()
        })

        passwords.forEach(p => {
            it(`não deve cadastrar com a senha ${p}`, function () {
                this.short_password.password = p

                signUpPage.form(this.short_password)
                signUpPage.submit()
            });
        })

        afterEach(() => {
            signUpPage.alert.haveText('Pelo menos 6 caracteres')
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
            it(`deve exibir ${alert.toLocaleLowerCase()}`, () => {
                signUpPage.alert.haveText(alert)
            });
        })
    });
});
