const Joi = require('@hapi/joi')

module.exports = {
	validateAuth(data) {
		const schema = Joi.object({
			email: Joi.string()
				.min(3)
				.required()
				.email(),
			password: Joi.string()
				.min(6)
				.required(),
			nick: Joi.string()
		})

		return schema.validate(data)
	}
}