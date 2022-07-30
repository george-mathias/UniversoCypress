describe('dashboard', () => {

    context('quando o cliente faz um agendamento no app mobile', () => {

        const data = {
            customer: {
                name: "Nikki Sixx",
                email: "sixx@motleycrue.com",
                password: "pwd123",
                is_provider: false
            },
            samurai: {
                name: "Ramon Valdes",
                email: "ramon@televisa.com",
                password: "pwd123",
                is_provider: true
            }
        }

        before(function () {
            cy.postUser(data.customer)
            cy.postUser(data.samurai)
            cy.apiLogin(data.customer)
            cy.log('apiToken: ', Cypress.env('api'))
        });
        it('o mesmo deve ser exibido no dashboard', function() {
            cy.log(data)
        });

    });

});

Cypress.Commands.add('apiLogin', (user) => {

    const payload = {
        email: user.email,
        password: user.password
    }

    cy.request({
        method: "POST",
        url: "http://localhost:3333/sessions",
        body: payload
    }).then((response) => {
        expect(response.status).to.eq(200)
        cy.log(response.body.token)
        Cypress.env('apiToken', response.body.token)
    })
    
})