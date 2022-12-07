// DEPENDENCIES
//

const mongoose = require("./connection")

// USER MODEL
//
const {Schema, model} = mongoose

const userSchema = new Schema ({
	user: {type: String, required: true, unique: true}, 
	password: {type: String, required: true}
})

const User = model('User', userSchema)

module.exports = User

