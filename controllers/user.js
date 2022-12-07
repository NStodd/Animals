// Dependencies
const express = require('express')
const User = require('../models/user')
const bcrypt = require('bcryptjs')

// Create Router
const router = express.Router()

// User Routes

// ------- Signup routes
router.get("/signup", (req, res) => {
	res.render('user/signup.ejs')
})

router.post("/signup", async (req, res) => {
	// encryption for password
	req.body.password = await bcrypt.hash(req.body.password, await bcrypt.genSalt(11))

	User.create(req.body, (err, user) => {
		res.redirect("/user/login")
	})
})

// ------- Login/Logout routes
router.get("/login", (req, res) => {
	res.render("user/login.ejs")
})

router.post("/login", (req, res) => {
	const {user, password} = req.body

	User.findOne({user}, (err, username) => {
		if (!username) {
			res.send("user doesn't exist")
		}
		else {
			const result = bcrypt.compareSync(password, username.password)
			if (result) {
				req.session.user = user
				req.session.loggedIn = true
				res.redirect('/animals')
			}
			else {
				res.send("wrong password")
			}
		}
	})
})

router.get('/logout', (req, res) => {
	req.session.destroy((err) => {
		res.redirect('/')
	})
})
