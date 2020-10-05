const express = require('express')
const router = express.Router()
const uid = require('../misc/uid')
const mail = require('../misc/mail')

// Import Support Model
const Support = require('../models/Support')

// @route POST /support
// @desc Create a support request
router
    .route('/support')
    .post(async (req, res) => {
        try {
            const { name, email, phone, message } = req.body

            // Create a new supportId
            const supportId = uid.uid('support')

            const support = new Support({
                supportId,
                name,
                email,
                phone,
                message
            })

            await mail.sendSupportMail(support)
            
            await support.save()

            res.status(200).send("Support request created")
        } catch (error) {
            console.log(error)
            res.status(400).send("Failed to create support request")
        }
    })

module.exports = router