

import loginPage from '../support/pages/login'

describe('login', () => {
    
    context('quando o usuário é muito bom', () => {
        
        const user = {
            email: 'jassa@samuraibs.com',
            password: 'pwd123'
        }

        it('deve logar com sucesso', () => {
            
            loginPage.go()
            loginPage.form(user)
            loginPage.submit()
        });
    });
});