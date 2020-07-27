const express = require('express')
const router = express.Router()
const uid = require('../misc/uid')
const crypt = require('../misc/crypt')
const mail = require('../misc/mail')

// Import models
const User = require('../models/User')
const VerifyOTP = require('../models/verifyOTP')

// @route POST /api/user/user_register
// @desc Register new user
router
    .route('/user_register')
    .post(async (req, res) => {
        try {
            if(!req.body.name || !req.body.email || !req.body.password) {
                res.status(400).send('Error registering user')
            } else {
                const userId = uid.uid()
                const { name, email, password } = req.body

                const setPassword = crypt.createPassword(password)
                const salt = (await setPassword).salt
                const hash = (await setPassword).hash

                user = new User({
                    userId,
                    name,
                    email,
                    salt,
                    hash
                })

                await user.save()

                
                const mailResponse = mail.sendMail(user)
                const otp = mailResponse
                
                verifyOTP = new VerifyOTP({
                    otp,
                    userId,
                    email
                })
                
                await verifyOTP.save()

                res.status(200).send('user registered')
            }
        } catch (error) {
            console.log(error)
            res.send(400).send('Error registering user')
        }
    })

module.exports = router