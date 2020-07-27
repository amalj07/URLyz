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

router
    .route('/user_account/verify')
    .post(async(req, res) => {
        try {
            const { otp, email } = req.body

            const userId = await User.findOne({ email }, 'userId -_id')

            const verifyOtp = await VerifyOTP.findOne({ userId: userId.userId, valid: true})

            if(verifyOtp.otp == otp && verifyOtp.email == email) {
                await VerifyOTP.updateOne({otp: otp}, {valid: false})
                await User.updateOne({ userId: userId.userId }, {verified: true})

                res.status(200).send('user account verified')
            } else {
                res.status(400).send('user verification failed')
            }

        } catch (error) {
            res.status(400).send('failed to verify account')
        }
    })

module.exports = router