describe('dashboard', () => {

    context('quando o cliente faz um agendamento no app mobile', () => {


        const data = {
            customer: {
                name: "Nikki Sixx",
                email: "sixx@motleycrue.com",
                password: "pwd123",
                is_provider: false
            },
            provider: {
                name: "Ramon Valdes",
                email: "ramon@televisa.com",
                password: "pwd123",
                is_provider: true
            }
        }

        before(function () {
            cy.postUser(data.provider)
            cy.postUser(data.customer)

            cy.apiLogin(data.customer)
            cy.setProviderId(data.provider.email)
            
        });

        it('o mesmo deve ser exibido no dashboard', function () {
            cy.log('providerId: ', Cypress.env('providerId'))

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

Cypress.Commands.add('setProviderId', (providerEmail) => {
    cy.request({
        method: "GET",
        url: "http://localhost:3333/providers",
        headers: {
            authorization: `Bearer ${Cypress.env('apiToken')}`
        }
    }).then((response) => {
        cy.log(response.body)

        const providerList = response.body

        providerList.forEach((provider) => {
            // cy.log('provider: ', provider.id)
            if (provider.email === providerEmail) {
                Cypress.env('providerId', provider.id)
            }
        })
    })
})