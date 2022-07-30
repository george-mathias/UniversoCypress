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

        let providerId = null
        before(function () {
            cy.postUser(data.provider)
            cy.postUser(data.customer)

            const payload = {
                email: data.customer.email,
                password: data.customer.password
            }

            cy.request({
                method: "POST",
                url: "http://localhost:3333/sessions",
                body: payload
            }).then((response) => {
                expect(response.status).to.eq(200)
                cy.log(response.body.token)

            }).then((response) => {

                cy.request({
                    method: "GET",
                    url: "http://localhost:3333/providers",
                    headers: { authorization: `Bearer ${response.body.token}` }
                }).then((response) => {

                    const providerList = response.body
                    
                    providerList.forEach((provider) => {
                        // cy.log('provider: ', provider.id)
                        if (provider.email === data.provider.email) { 
                            providerId = provider.id
                        }
                    })
                    // cy.log('providerId: ', providerId)
                })
            })


        });
        it('o mesmo deve ser exibido no dashboard', function () {
            // cy.log('token', token)
            // cy.setProviderId(token)
            cy.log('providerId: ', providerId)
        });

    });

});

// Cypress.Commands.add('setProviderId', (token, providerEmail) => {
//     cy.request({
//         method: "GET",
//         url: "http://localhost:3333/providers",
//         headers: { authorization: `Bearer ${token}` }
//     }).then((response) => {

//         const providerList = response.body
//         // cy.log('log', response.body[0])
//         // cy.log(response.body[0].id)
//         providerList.forEach((provider) => {
//             cy.log(provider.id)
//             if( providerList === providerEmail) {}
//         })
//     })
// })
