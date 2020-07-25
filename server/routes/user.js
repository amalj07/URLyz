const express = require('express')
const router = express.Router()
const uid = require('../misc/uid')

// Import user model
const User = require('../models/User')

// @route POST /api/user/register
// @desc Register new user
router
    .route('/register')
    .post(async (req, res) => {
        try {
            if(!req.body.name || !req.body.email || !req.body.password) {
                res.status(400).send('Error registering user')
            } else {
                const userId = uid.uid()
                const { name, email, password } = req.body

                user = new User({
                    userId,
                    name,
                    email,
                    password
                })

                await user.save()

                res.status(200).send('user registered')

            }
        } catch (error) {
            console.log(error)
            res.send(400).send('Error registering user')
        }
    })

module.exports = router