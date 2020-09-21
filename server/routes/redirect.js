const express = require('express')
const path = require('path')
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
                    res.sendFile(path.join(__dirname, '../../dist', 'index.html'))
                } else {
                    
                    await Url.update({urlCode}, {$inc: {visits: 1}})
                    return res.redirect(url.longUrl)
                }
            } else {
                res.sendFile(path.join(__dirname, '../../dist', 'index.html'))
            }
        } catch (error) {
            console.log(error)
            res.status(500).json('Internal server error')
        }
    })

module.exports = router