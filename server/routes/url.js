const express = require('express')
const router = express.Router()

// Import Models
const Session = require('../models/Session')
const User = require('../models/User')
const Url = require('../models/Url')


// @route POST /redirect
// @desc Fetch every urls a user to show in dashboard
router
    .route('/fetchurl')
    .get(async (req, res) => {
        try {
            const urls = await Url.find({ userId: req.userId}, '-userId -_id -date')
            if (urls) {
                res.status(200).send(urls)
            } else {
                res.status(401).send('Failed to fetch urls')
            }

        } catch (error) {
            console.log(error)
            res.status(401).send('Failed to fetch urls')
        }
    })


// @route POST /updateurlstatus
// @desc Fetch every urls a user to show in dashboard
router
    .route('/updateurlstatus')
    .post(async (req, res) => {
        try {
            let { url } = req.body

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
        } catch (error) {
            console.log(error)
            res.status(401).send('Failed to update url')
        }
    })


// @route POST /deleteurl
// @desc Fetch every urls a user to show in dashboard
router
    .route('/deleteurl')
    .post(async (req, res) => {
        try {
            let { url } = req.body

            await Url.findOneAndDelete({ urlCode: url.urlCode })
            await User.updateOne({userId: req.userId}, {$inc: {urlNos: -1}})
            res.status(200).send('Url deleted')
        } catch (error) {
            console.log(error)
            res.status(401).send("Failed to delete url")
        }
    })
module.exports = router