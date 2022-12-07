const express = require("express")
const Animal = require('../models/animal')

// DEFINE ROUTER
const router = express.Router()


// AUTH MIDDLEWARE
/** For user auth, if I can get the rest working.*/
// router.use((req, res, next) => {
// 	if (req.session.loggedIn) {
// 		next()
// 	}
// 	else {
// 		res.redirect('/user/login')
// 	}	
// })

// ROUTES

// Index Route
router.get('/', (req, res) => {
	console.log(req.session)
	Animal.find().then((animals) =>{res.render('animals/index.ejs', {animals})}) // take this out for user auth
	// Animal.find( {user : req.session.user} )
	// .then((animals) => {
	// 	res.render('animals/index.ejs', { animals })
	// })
	// .catch(err => console.log(err))
})

// New Route
router.get('/new', (req, res) => {
	res.render('animals/new.ejs')
})

// Create Route
router.post('/', (req, res) => {
	req.body.extinct = req.body.extinct === 'on' ? true : false
	// req.body.user = req.session.user
	req.body.lifeExpectancy = parseInt(req.body.lifeExpectancy)

	Animal.create(req.body, (err, newAnimal) => {
		console.log('created', newAnimal, err)
		res.redirect('/animals')
	})
})

// Edit Route
router.get('/:id/edit', (req, res) => {
	const id = req.params.id

	Animal.findById(id, (err, targetAnimal) => {
		res.render('animals/edit.ejs', {animal: targetAnimal})
	})

})

// Update Route
router.put('/:id', (req, res) => {
	req.body.extinct = req.body.extinct === 'on' ? true : false
	req.body.lifeExpectancy = parseInt(req.body.lifeExpectancy)

	Animal.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedAnimal) => {
	
		console.log(updatedAnimal)
		res.redirect(`/animals/${req.params.id}`)
	})
})



// Show Route
router.get('/:id', (req, res) => {
	Animal.findById(req.params.id)
	.then((animal) => {
		res.render('animals/show.ejs', {animal})
	})
})

// Destroy Route
router.delete('/:id', (req, res) => {
	Animal.findByIdAndDelete(req.params.id, (err, deletedAnimal) => {
		console.log(err, deletedAnimal)
		res.redirect('/animals')
	})

	// const deletedAnimal = await Animal.findByIdAndDelete(req.params.id)
	// if (deletedAnimal) {
	// 	res.redirect('/animals/')
	// }
})



// Export Router
module.exports = router
