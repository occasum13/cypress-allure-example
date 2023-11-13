const { defineConfig } = require('cypress')

module.exports = defineConfig({
	e2e: {
	  setupNodeEvents(on, config) {
		return require ('./cypress/plugin/index')(on, config)
	  },
		baseUrl: 'https://your-base-url.com',
		username: 'your-api-username',
		password: 'your-api-password',
		video: false,
		videoCompression: 0,
		retries: 3,
		screenshotOnRunFailure: true,
		specPattern: 'cypress/e2e/api/**/*.{feature,cy.{js,jsx,ts,tsx}}'
	},
})

