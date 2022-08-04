import dashPage from '../support/pages/dash'
import { customer, provider, appointment } from '../support/factories/dash'

describe('dashboard', () => {

    context('quando o cliente faz um agendamento no app mobile', () => {

        before(function () {
            cy.postUser(provider)
            cy.postUser(customer)

            cy.apiLogin(customer)
            cy.setProviderId(provider.email)
            cy.createAppointment(appointment.hour)

        });

        it('o mesmo deve ser exibido no dashboard', function () {

            // cy.uiLogin(provider)
            cy.apiLogin(provider, true)

            dashPage.calendarShouldBeVisible()
            dashPage.selectDay(Cypress.env('appointmentDay'))
            dashPage.appointmentShouldBe(customer, appointment.hour)

        });

    });

});