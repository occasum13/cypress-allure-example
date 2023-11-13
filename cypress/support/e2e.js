import postgreSQL from 'cypress-postgresql'
import '@shelex/cypress-allure-plugin'
postgreSQL.loadDBCommands()

import './commands_sql'
import '@shelex/cypress-allure-plugin'
import 'faker-br'

afterEach(() => {
    //this will read your current test title and append it to data
    let data = {
        feature: Cypress.currentTest.title
    }
    //this will check if it hasn't passed and the retry is deeply equal to 3 (if you have set it to run 3+ times), and if its the case, it will call errorCenarios cy.task in cypress/support/lib/slack.js
    if (Cypress.mocha.getRunner().suite.ctx.currentTest.state != 'passed' && Cypress.mocha.getRunner().suite.ctx.currentTest._currentRetry == 3) {
        cy.task('errorCenarios', data)
    }
})

Cypress.on('uncaught:exception', () => {
	return false
})
