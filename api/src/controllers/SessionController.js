const jwt = require('jsonwebtoken')
const Boom = require('boom')

const User = require('../models/User')

const { genHash, compHash } = require('../helpers/PasswordHelper')
const { validateAuth } = require('../helpers/AuthHelper')

module.exports = {
    async store(req, res) {
		const { email, password } = req.body
		const [nick] = email.match(/[^@]*/)

		// Hash password
		let hashed = await genHash(password)

		// Validation
		const { error } = validateAuth(req.body)
		if(error) return res.status(400).send(error.details[0].message)

		// Verify if user exists
		let user = await User.findOne({ email })
        if (!user) {
            user = await User.create({ email, password: hashed, nick })
		}

		// If user exists, verify password
		let validPass = await compHash(password, user.password)
		if(!validPass) {
			return res.send(Boom.badRequest("Wrong password"))
		}

		//Create and assing token
		const token = jwt.sign({ _id: user._id, email, nick }, process.env.JWT_SECRET)
		res.header('auth-token', token)

        return res.json(user)
    }
}
