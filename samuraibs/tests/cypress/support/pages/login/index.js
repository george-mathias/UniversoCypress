import { el } from './elements'
import toast from '../../components/toast'

class LoginPage {
    
    constructor() {
        this.toast = toast
    }

    go() {
        cy.visit('/')
    }

    form(user) {
        cy.get(el.name)
            .clear()
            .type(user.email)
        cy.get(el.password)
            .clear()
            .type(user.password)
    }

    submit() {
        cy.contains(el.signUpButton).click()
    }

    alertHaveText(expectedText) {
        cy.contains(el.alertEmailError, expectedText)
    }
}

export default new LoginPage()