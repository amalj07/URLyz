const express = require('express')
const router = express.Router()

// Import Models
const Session = require('../models/Session')
const User = require('../models/User')
const Url = require('../models/Url')

router
    .route('/fetchurl')
    .post(async (req, res) => {
        const { sid, token } = req.body

        const userSession = await Session.findOne({sid: sid, token: token}, '-_id')

        const urls = await Url.find({userId: userSession.userId}, '-userId -_id -date')
        console.log(urls[0])
        res.status(200).send(urls)
    })

module.exports = router