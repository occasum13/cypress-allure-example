/// <reference types="cypress" />
import {fakerName, fakerEmail, fakerPhone, fakerExternalId} from './faker'
const faker = require('faker-br')

//some global functions that might be useful

export function getDate (type) {
	let date = new Date()

	let hour = String(date.getHours()).padStart(2, '0')
	let minutes = String(date.getMinutes()).padStart(2, '0')
	let seconds = String(date.getSeconds()).padStart(2, '0')
	let milliSeconds = String(date.getMilliseconds()).padStart(3, '0')

	let dd = String(date.getDate()).padStart(2, '0')
	let mm = String(date.getMonth() +1).padStart(2, '0')
	let yyyy = date.getFullYear()
	let schedule = yyyy + '-' + mm + '-' + dd + 'T' + hour + ':' + minutes + ':' + seconds + '.' + milliSeconds + 'Z'
	let surveySchedule = yyyy + '-' + mm + '-' + dd + '-' + hour + '-' + minutes + "-" + seconds
	let isoDate = yyyy + '-' + mm + '-' + dd + ' ' + hour + ':' + minutes + ':' + seconds

	if (type == 'surveySchedule'){
		return surveySchedule
	} else if (type == 'isoDate') {
		return isoDate
	} else {
		return schedule
	}
}

export function uuidRegex () {
	return /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i
}

export function dateTimeRegex () {
	return /^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}:\d{2}$/
}

export function emailRegex () {
	return /\S+@\S+\.\S+/
}

export function phoneRegex () {
	return /^\d{9,13}$/
}

export function ratingRegex () {
	return /^(?:10|\d)$/
}

export function stringRegex () {
	return /^[a-zA-ZÀ-ÖØ-öø-ÿ\s']+$/
}