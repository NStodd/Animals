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

// Home Route
 router.get('/', (req, res) => {
  	Animal.find().then((animals) =>{res.render('animals/index.ejs', {animals})}) // take this out for user auth
  	//res.render("animals/index.ejs", {})
  	// res.render('index.ejs') for when we want the signup/login as landing page
 })

// Index Route
router.get('/animals', (req, res) => {
	console.log(req.session)
	Animal.find().then((animals) =>{res.render('animals/index.ejs', {animals})}) // take this out for user auth
	// Animal.find( {user : req.session.user} )
	// .then((animals) => {
	// 	res.render('animals/index.ejs', { animals })
	// })
	// .catch(err => console.log(err))
})

// New Route
router.get('/animals/new', (req, res) => {
	res.render('animals/new.ejs')
})

// Create Route
router.post('/animals', (req, res) => {
	req.body.extinct = req.body.extinct === 'on' ? true : false
	// req.body.user = req.session.user
	req.body.lifeExpectancy = parseInt(req.body.lifeExpectancy)

	Animal.create(req.body, (err, newAnimal) => {
		console.log('created', newAnimal, err)
		res.redirect('/animals')
	})
})

// Edit Route
router.get('/animals/:id/edit', (req, res) => {
	const id = req.params.id

	Animal.findById(id, (err, targetAnimal) => {
		res.render('animals/edit.ejs', {animal: targetAnimal})
	})

})

// Update Route
router.put('/animals/:id', (req, res) => {
	req.body.extinct = req.body.extinct === 'on' ? true : false
	req.body.lifeExpectancy = parseInt(req.body.lifeExpectancy)

	Animal.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedAnimal) => {
	
		console.log(updatedAnimal)
		res.redirect(`/animals/${req.params.id}`)
	})
})



// Show Route
router.get('/animals/:id', (req, res) => {
	Animal.findById(req.params.id)
	.then((animal) => {
		res.render('animals/show.ejs', {animal})
	})
})

// Destroy Route
router.delete('/animals/:id', (req, res) => {
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
