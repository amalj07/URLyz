const express = require('express')
const router = express.Router()

// import url model
const Url = require('../models/Url')

// @route GET /:code
// @desc Redirect to original url
router
    .route('/:code')
    .get(async (req, res) => {
        try {

            const urlCode = req.params.code

            const url = await Url.findOne({ urlCode })

            if (url) {
                if (url.status == 'disabled') {
                    res.status(404).end()
                } else {
                    
                    await Url.update({urlCode}, {$inc: {visits: 1}})
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