
import loginPage from '../support/pages/login'
import dashPage from '../support/pages/dash'

describe('login', () => {

    context('quando o usuário é muito bom', () => {

        const user = {
            name: 'Robson Jassa',
            email: 'jassa@samuraibs.com',
            password: 'pwd123',
            is_provider: true
        }

        before(() => {
            cy.task('removeUser', user.email)
                .then((result) => {
                    Object.keys(result).forEach((r) => {
                        cy.log('result:', r);
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

        it('deve logar com sucesso', () => {

            loginPage.go()
            loginPage.form(user)
            loginPage.submit()

            dashPage.header.userLoggedIn(user.name)
        });
    });
});