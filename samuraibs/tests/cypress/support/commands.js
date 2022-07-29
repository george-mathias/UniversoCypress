// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('postUser', (user) => {
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
})

Cypress.Commands.add('recoveryPass', (email) => {
    cy.request(
        'POST',
        'http://localhost:3333/password/forgot',
        { email: email }
    ).then((response) => {
        expect(response.status).to.eq(204)
    })
})