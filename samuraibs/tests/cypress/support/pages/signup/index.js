
// não faz parte do treinamento
// const selectors = {
//     input: {
//         name: 'input[placeholder="Nome"]',
//         email: 'input[placeholder="E-mail"]',
//         pass: 'input[placeholder="Senha"]'
//     },
//     dados: {
//         name: "George Mathias",
//         email: "fulano@gmail.com",
//         pass: "abc123"
//     }
// }

import { el } from './elements'
import toast from '../../components/toast/'


class SignUpPage {

    constructor() {
        this.toast = toast
    }

    go() {
        cy.visit("/signup")
    }

    form(user) {

        // não faz parte do treinamento
        // Object.keys(selectors.input).forEach((selector) => {
        //     cy.get(selectors.input[selector])
        //         .should('be.visible')
        //         .type(selectors.dados[selector])
        // }) 

        cy.get(el.name).type(user.name) // começa com
        cy.get(el.email).type(user.email) // termina com
        cy.get(el.password).type(user.password) // contém
    }
    submit() {
        cy.contains(el.signUpButton).click()
    }

    alertHaveText(expectedText) {
        cy.contains('.alert-error', expectedText)
            .should('be.visible')
    }

}

export default new SignUpPage()