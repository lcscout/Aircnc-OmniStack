const bcrypt = require('bcryptjs')

module.exports = {
	async genHash(plain) {
		const salt = await bcrypt.genSalt(10)
		const hashedPassword = await bcrypt.hash(plain, salt)

		return hashedPassword
	},

	async compHash(requested, hashedOnDB) {
		const validPass = await bcrypt.compare(requested, hashedOnDB)

		return validPass
	}
}
