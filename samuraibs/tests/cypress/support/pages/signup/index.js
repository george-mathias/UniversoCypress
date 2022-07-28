
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
import alert from '../../components/alert'


class SignUpPage {

    constructor() {
        this.toast = toast
        this.alert = alert
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

}

export default new SignUpPage()