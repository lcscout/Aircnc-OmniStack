const Spot = require('../models/Spot')

module.exports = {
    async show(req, res) {
        const { _id } = req.user

        const spots = await Spot.find({ user: _id })

        return res.json(spots)
    }
}