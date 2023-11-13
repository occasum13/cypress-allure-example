let convertString
let token

export function generateToken() {
	convertString =  Cypress.config('username')+':'+Cypress.config('password')
	token = btoa(convertString)
    return token
}


