const express = require('express')
const validUrl = require('valid-url')
const shortid = require('shortid')
const config = require('../config/config')

const router = express.Router()

// import models
const urlModel = require('../models/Url')
const Session = require('../models/Session')

// @route POST /api/url/shorten
// @desc Create the short url
router
    .route('/shorten')
    .post(async (req, res) => {
        const { sid, token, longUrl } = req.body
        const baseUrl = config.baseUrl.baseurl

        // Check base url
        if (!validUrl.isUri(baseUrl)) {
            return res.status(401).json("invalid base url")
        }

        // Create url code
        const urlCode = shortid.generate()

        // Check long url
        if (validUrl.isUri(longUrl)) {
            try {
                // Check if sid and token is not null
                if (sid != '' && token != '') {
                    // Find usersession based on sid and token
                    const userSession = await Session.findOne({ sid: sid, token: token }, '-_id')

                    if (userSession) {
                        // If valid userSession, check if short url already exist
                        const url = await urlModel.findOne({ longUrl: longUrl, userId: userSession.userId })
                        if (url) {
                            res.status(200).json(url.shortUrl)
                        } else {
                            // Create new short url if long url is not present
                            const shortUrl = baseUrl + '/' + urlCode

                            newUrl = new urlModel({
                                longUrl,
                                shortUrl,
                                urlCode,
                                userId: userSession.userId,
                                date: new Date
                            })

                            await newUrl.save()

                            res.status(200).json(newUrl.shortUrl)
                        }
                    } else {
                        res.status(400).end()
                    }
                } else {             // If sid and token is null
                    // Check if short url already exist
                    const url = await urlModel.findOne({ longUrl: longUrl, userId: 'nouser' }, '-_id')
                    if (url) {
                        res.status(200).json(url.shortUrl)
                    } else {
                        // Create new short url if long url is not present
                        const shortUrl = baseUrl + '/' + urlCode
                        console.log(shortUrl)

                        newUrl = new urlModel({
                            longUrl,
                            shortUrl,
                            urlCode,
                            userId: 'nouser',
                            date: new Date
                        })

                        await newUrl.save()

                        res.status(200).json(newUrl.shortUrl)
                    }
                }
            } catch (error) {
                console.log(error)
                res.status(500).end()
            }
        } else {
            res.status(401).json('Invalid long url')
        }
    })

module.exports = router