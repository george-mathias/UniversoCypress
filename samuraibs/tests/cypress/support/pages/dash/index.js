
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