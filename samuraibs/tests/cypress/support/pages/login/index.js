import { el } from './elements'
import toast from '../../components/toast'
import alert from '../../components/alert'

class LoginPage {

    constructor() {
        this.toast = toast
        this.alert = alert
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
}

export default new LoginPage()