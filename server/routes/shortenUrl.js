const express = require('express')
const validUrl = require('valid-url')
const shortid = require('shortid')
const config = require('../config/config')

const router = express.Router()

// import models
const Url = require('../models/Url')
const Session = require('../models/Session')
const User = require('../models/User')

// @route POST /api/url/shorten
// @desc Create the short url
router
    .route('/shorten')
    .post(async (req, res) => {
        try {
            const { sid, t } = req.cookies
            const { longUrl, customUrl } = req.body
            const baseUrl = config.baseUrl.baseurl

            // Check base url
            if (!validUrl.isUri(baseUrl)) {
                return res.status(401).json("invalid base url")
            }

            const urlCode = customUrl == '' ? shortid.generate() : customUrl

            // Check if the custom URL is already registered
            const urlCodeInDb = await Url.findOne({ urlCode })


            if (urlCodeInDb != null) {
                res.status(401).send("Custom url already taken")
            } else {
                // Check long url
                if (validUrl.isUri(longUrl)) {
                    // Check if sid and token is not null
                    if (sid != undefined && t != undefined) {
                        // Find usersession based on sid and token
                        const userSession = await Session.findOne({ sid: sid, token: t }, '-_id')

                        if (userSession) {
                            // If valid userSession, check if short url already exist
                            const url = await Url.findOne({ longUrl: longUrl, userId: userSession.userId })
                            if (url) {
                                res.status(200).json(url.shortUrl)
                            } else {
                                // Create new short url if long url is not present
                                const shortUrl = baseUrl + '/' + urlCode

                                newUrl = new Url({
                                    longUrl,
                                    shortUrl,
                                    urlCode,
                                    userId: userSession.userId,
                                    date: new Date
                                })

                                await newUrl.save()

                                await User.updateOne({ userId: userSession.userId }, { $inc: { urlNos: 1 } })

                                res.status(200).json(newUrl.shortUrl)
                            }
                        } else {
                            res.status(401).send('Invalid user')
                        }
                    } else {             // If sid and token is null
                        // Check if short url already exist
                        const url = await Url.findOne({ longUrl: longUrl, userId: 'nouser' }, '-_id')
                        if (url) {
                            res.status(200).json(url.shortUrl)
                        } else {
                            // Create new short url if long url is not present
                            const shortUrl = baseUrl + '/' + urlCode
                            console.log(shortUrl)

                            newUrl = new Url({
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
                } else {
                    res.status(401).json('Invalid URL')
                }
            }
        } catch (error) {
            console.log(error)
            res.status(401).send('Something went wrong!')
        }
    })

module.exports = router