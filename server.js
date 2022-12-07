// DEPENDENCIES
//
//
require("dotenv").config()
const express = require('express')
const morgan = require('morgan')
const methodOverride = require('method-override')
const PORT = process.env.PORT || 3210
const AnimalRouter = require('./controllers/animal')
const UserRouter = require('./controllers/user')
const session = require('express-session')
const MongoStore = require('connect-mongo')

// Initialize
const app = express()

// MIDDLEWARE
// 

app.use(morgan('tiny'))
app.use(methodOverride('_method'))
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))


/*
 For adding in user auth, if I can get the rest working.
*/

// app.use(
// 	session({
// 		secret: process.env.SECRET,
// 		store: MongoStore.create({mongoUrl: process.env.DATABASE_URL}),
// 		saveUninitialized: true,
// 		resave: false,
// 	})
// )

// Use the Routers
app.use('', AnimalRouter)
console.log("welp, we've made it this far.")
// app.use('/user', UserRouter)
console.log("but not this far.")

// // Home Route
// app.get('/', (req, res) => {
// 	Animal.find().then((animals) =>{res.render('animals/index.ejs', {animals})}) // take this out for user auth
// 	res.render("animals/index.ejs", {})
// 	// res.render('index.ejs') for when we want the signup/login as landing page
// })

app.listen(PORT, () => {
	console.log(`Connected to port ${PORT}`)
})