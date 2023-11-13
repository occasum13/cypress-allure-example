import * as scriptsSQL from '../fixtures/sql'

//here you can call your SQL commands like this to add it in your tests

Cypress.Commands.add('selectSomethingFromDB', (example) => {
	cy.postgreSQL(scriptsSQL.selectSomethingFromDB(example))
})