const express = require('express')
const validUrl = require('valid-url')
const shortid = require('shortid')
const config = require('../config/config')

const router = express.Router()

// import models
const urlModel = require('../models/Url')

// @route POST /api/url/shorten
// @desc Create the short url
router
    .route('/shorten')
    .post(async (req, res) => {
        const { longUrl } = req.body
        const baseUrl = config.baseUrl.baseurl

        // Check base url
        if(!validUrl.isUri(baseUrl)) {
            return res.status(401).json("invalid base url")
        }

        // Create url code
        const urlCode = shortid.generate()

        // Check long url
        if(validUrl.isUri(longUrl)) {
            try {
                // Check if url is already present
                let url = await urlModel.findOne({ longUrl })

                if(url) {
                    res.status(200).json(url)
                } else {
                    // Create new short url if long url is not present
                    const shortUrl = baseUrl + '/' + urlCode

                    url = new urlModel({
                        longUrl,
                        shortUrl,
                        urlCode,
                        date: new Date
                    })

                    await url.save()

                    res.status(200).json(url)
                }
            } catch (error) {
                console.log(error)
                res.status(500).json('Internal server error')
            }
        } else {
            res.status(401).json('Invalid long url')
        }
    })

module.exports = router