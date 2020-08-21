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
        res.status(200).send(urls)
    })

router
    .route('/disable')
    .post(async (req, res) => {
        try {
            let { url } = req.body

            if(url.status === 'active'){
                const response = await Url.findOneAndUpdate({ urlCode: url.urlCode }, { status: 'disabled'}, {new: true})

                url = {
                    status: response.status,
                    urlCode: response.urlCode,
                    longUrl: response.longUrl,
                    shortUrl: response.shortUrl
                }
            } else {
                const response = await Url.findOneAndUpdate({urlCode: url.urlCode}, {status: 'active'}, {new: true})

                url = {
                    status: response.status,
                    urlCode: response.urlCode,
                    longUrl: response.longUrl,
                    shortUrl: response.shortUrl
                }
            }
            
            res.status(200).send(url)

        } catch (error) {
            console.log(error)
        }
    })

module.exports = router