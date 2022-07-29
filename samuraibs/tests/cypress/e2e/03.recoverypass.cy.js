import forgotPassPage from "../support/pages/forgotpass"
import resetPassPage from '../support/pages/resetpass'

describe('resgate de senha', () => {

    before(() => {
        cy.fixture('recovery').then(function (recovery) {
            this.data = recovery
        })
    });

    context('quando o usuário esquece a senha', function () {

        before(function () {
            cy.postUser(this.data)
        });

        it('deve poder resgatar por email', function () {

            const message = 'Enviamos um e-mail para confirmar a recuperação de senha, cheque sua caixa de entrada.'
            forgotPassPage.go()
            forgotPassPage.form(this.data.email)
            forgotPassPage.submit()

            forgotPassPage.toast.shouldHaveText(message)
        });
    });

    context('quando o usuário solicita o resgate', () => {

        let token = null
        before(function () {
            cy.postUser(this.data)
            cy.recoveryPass(this.data.email)
            cy.task('findToken', this.data.email)
                .then(function (result) {
                    token = result.token
                    cy.log('token', result.token)
                })
        });

        it('deve poder cadastrar uma nova senha', function () {
            
            const message = 'Agora você já pode logar com a sua nova senha secreta.'
            
            resetPassPage.go(token)
            resetPassPage.form('abc123', 'abc123')
            resetPassPage.submit()

            resetPassPage.toast.shouldHaveText(message)
        });
    });
});