import { el } from './elements'
import toast from '../../components/toast'

class ForgtoPassPage {

    constructor() {
        this.toast = toast
    }
    go() {
        cy.visit('/forgot-password')

        cy.contains(el.title)
            .should('be.visible')
    }

    form(email) {
        cy.get(el.email)
            .should('be.visible')
            .type(email)
    }

    submit() {
        cy.contains(el.btn_recuperar, 'Recuperar')
            .should('be.visible')
            .click()
    }

}

export default new ForgtoPassPage()