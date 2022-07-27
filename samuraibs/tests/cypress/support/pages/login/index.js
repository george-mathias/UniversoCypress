import { el } from './elements'

class loginPage {

    go() {
        cy.visit('/')
    }

    form(user) {
        cy.get(el.name).type(user.email)
        cy.get(el.password).type(user.password)
    }

    submit() {
        cy.contains(el.signUpButton).click()
    }
}

export default new loginPage()