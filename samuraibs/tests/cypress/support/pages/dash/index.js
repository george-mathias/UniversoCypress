
import header from '../../components/header'
import { el } from './elements'
class DashPage {

    constructor() {
        this.header = header
    }

    calendarShouldBeVisible() {
        cy.get(el.calendar, { timeout: 7000 })
            .should('be.visible')
    }

    selectDay(day) {

        let today = new Date()
        let lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0)

        if (today.getDate() === lastDayOfMonth.getDate()) {
            cy.log('Hoje é o último dia do mês');
            cy.get(el.nextMonthButton)
                .should('be.visible')
                .click()

            cy.contains(el.monthYearName, 'Abril')
                .should('be.visible')

        } else {
            cy.log('Hoje não é o último dia do mês');

        }

        cy.log(today.toString());
        cy.log(lastDayOfMonth.toString());

        const target = new RegExp('^' + day + '$', 'g')
        cy.contains(el.boxDay, target)
            .click()
    }

    appointmentShouldBe(customer, hour) {
        cy.contains("div", customer.name, { timeout: 7000 })
            .should('be.visible')
            .parent()
            .contains(el.boxHour, hour, { timeout: 7000 })
            .should('be.visible')
    }

}

export default new DashPage()