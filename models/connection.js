// DATABASE CONNECTIONS
//
require("dotenv").config()

const mongoose = require("mongoose")

const DATABASE_URL = process.env.DATABASE_URL
const CONFIG = {
	useNewUrlParser: true,
	useUnifiedTopology: true
}


// Connect
//
mongoose.connect(DATABASE_URL, CONFIG)


// Logging
//
mongoose.connection
	.on("open", () => {console.log("Connected to Mongoose")})
	.on("close", () => {console.log("Disconnected from Mongoose")})
	.on("error", (err) => {console.log("Mongoose Error", err)})


// Export Connection
//
module.exports = mongoose
