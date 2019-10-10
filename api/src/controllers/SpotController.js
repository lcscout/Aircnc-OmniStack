const Spot = require('../models/Spot')
const User = require('../models/User')

module.exports = {
    async index(req, res) {
        const { tech } = req.query

        const spots = await Spot.find({ techs: tech })

        return res.json(spots)
    },

    async store(req, res) {
        const { filename } = req.file
        const { company, price, techs } = req.body
        const { _id } = req.user

        const user = await User.findById(_id)
        if(!user) {
            return res.status(400).json({ error: 'User does not exist' })
        }

        const spot = await Spot.create({
            user: _id,
            thumbnail: filename,
            company,
            techs: techs.split(',').map(tech => tech.trim()),
            price
        })

        return res.json(spot)
    }
}