// Dependencies
//
require('dotenv').config()
const mongoose = require('./connection')
const Animal = require('./animal')

mongoose.connection.on('open', () => {

	const startingAnimals = [
		{species: "Gazelle", extinct: false, location: "Savannah", lifeExpectancy: 12},
		{species: "Stegasaurus", extinct: true, location: "Pangaea", lifeExpectancy: 34},
		{species: "Blue Whale", extinct: false, location: "Oceans", lifeExpectancy: 106},
		{species: "Ladybug", extinct: false, location: "Grassland", lifeExpectancy: 2},
	]
	Animal.deleteMany({}, (err, data) => {
		Animal.create(startingAnimals, (err, data) => {
			console.log(data)
			mongoose.connection.close()
		})
	})
})
