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

        const userSession = await Session.findOne({ sid: sid, token: token }, '-_id')
        if (userSession) {
            const urls = await Url.find({ userId: userSession.userId }, '-userId -_id -date')
            if (urls) {
                res.status(200).send(urls)
            } else {
                res.status(401).send('Failed to fetch urls')
            }
        } else {
            res.status(401).send('Invalid user')
        }

    })

router
    .route('/disable')
    .post(async (req, res) => {
        try {
            let { sid, token, url } = req.body

            const userSession = await Session.findOne({ sid: sid, token: token }, '-_id')

            if (userSession) {
                if (url.status === 'active') {
                    const response = await Url.findOneAndUpdate({ urlCode: url.urlCode }, { status: 'disabled' }, { new: true })

                    url = {
                        status: response.status,
                        urlCode: response.urlCode,
                        longUrl: response.longUrl,
                        shortUrl: response.shortUrl
                    }
                } else {
                    const response = await Url.findOneAndUpdate({ urlCode: url.urlCode }, { status: 'active' }, { new: true })

                    url = {
                        status: response.status,
                        urlCode: response.urlCode,
                        longUrl: response.longUrl,
                        shortUrl: response.shortUrl
                    }
                }

                res.status(200).send(url)
            } else {
                res.status(401).send('Invalid user')
            }
        } catch (error) {
            res.status(401).send('Failed to update url')
        }
    })

router
    .route('/delete')
    .post(async (req, res) => {
        try {
            let { sid, token, url } = req.body

            const userSession = await Session.findOne({ sid: sid, token: token }, '-_id')

            if (userSession) {
                await Url.findOneAndDelete({ urlCode: url.urlCode })
                await User.update({userId: userSession.userId}, {$inc: {urlNos: -1}})
                res.status(200).send('Url deleted')
            } else {
                res.status(401).send('Invalid user')
            }
        } catch (error) {
            res.status(401).send("Failed to delete url")
        }
    })
module.exports = router