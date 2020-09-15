const express = require('express')
const router = express.Router()

// import url model
const urlModel = require('../models/Url')

// @route GET /:code
// @desc Redirect to original url
router
    .route('/:code')
    .get(async (req, res) => {
        try {
            const url = await urlModel.findOne({ urlCode: req.params.code })

            if (url) {
                if (url.status == 'disabled') {
                    res.status(404).end()
                } else {
                    return res.redirect(url.longUrl)
                }
            } else {
                return res.status(404).json('No url found')
            }
        } catch (error) {
            console.log(error)
            res.status(500).json('Internal server error')
        }
    })

module.exports = router