
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

class SignUpPage {

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

        cy.get('input[placeholder^="Nome"]').type(user.name) // começa com
        cy.get('input[placeholder$="email"]').type(user.email) // termina com
        cy.get('input[placeholder*="senha"]').type(user.password) // contém
    }
    submit() {
        cy.contains("button", "Cadastrar").click()
    }

    toastHaveText(expectText) {
        cy.get('.toast')
            .should('be.visible')
            .find('p')
            .should('have.text', expectText)
    }
}

export default new SignUpPage()