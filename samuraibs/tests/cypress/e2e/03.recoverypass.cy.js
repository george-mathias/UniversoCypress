import forgotPassPage from "../support/pages/forgotpass"

describe('resgate de senha', () => {

    before(() => {
        cy.fixture('recovery').then(function(recovery) {
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
});