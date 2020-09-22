const express = require('express')
const router = express.Router()
const crypt = require('../misc/crypt')

// Import Models
const User = require('../models/User')
const Session = require('../models/Session')
const VerifyOTP = require('../models/verifyOTP')

const mail = require('../misc/mail')

router
    .route('/updateuser')
    .post(async (req, res) => {
        try {
            const { sid, token, data, type } = req.body

            const userId = await Session.findOne({ sid: sid, token: token }, '-_id -sid -token')

            if (userId) {
                if (type == 'name') {
                    let response = await User.findOneAndUpdate({ userId: userId.userId }, { name: data }, { new: true })
                    const user = {
                        name: response.name,
                        email: response.email,
                        urlNos: response.urlNos
                    }
                    res.status(200).send(user)
                } else if (type == 'email') {
                    let response = await User.findOneAndUpdate({ userId: userId.userId }, { email: data }, { new: true })
                    const user = {
                        name: response.name,
                        email: response.email,
                        urlNos: response.urlNos
                    }
                    res.status(200).send(user)
                }
            } else {
                res.status(401).end()
            }
        } catch (error) {
            console.log(error)
        }
    })

router
    .route('/verifypassword')
    .post(async (req, res) => {
        try {
            const { sid, t } = req.cookies
            const { password } = req.body

            const userId = await Session.findOne({ sid: sid, token: t }, '-_id -sid -token')

            if (userId) {
                const user = await User.findOne({ userId: userId.userId }, '-_id')

                if (user) {
                    const validPassword = crypt.checkPassword(password, user.salt, user.hash)

                    if (validPassword == true) {
                        res.status(200).send("passwd_verification_success")
                    } else {
                        res.status(401).send("Invalid password")
                    }
                } else {
                    res.status(401).send("Invalid user")
                }

            } else {
                res.status(401).send("Invalid user")
            }

        } catch (error) {
            console.log(error)
            res.status(401).send("Failed to verify password")
        }
    })

router
    .route('/updatepassword')
    .post(async (req, res) => {
        try {
            const { sid, t} = req.cookies
            const { newPassword } = req.body

            if (newPassword == '') {
                res.status(401).send('Failed to update password')
            } else {
                const userId = await Session.findOne({ sid: sid, token: t }, '-_id -sid -token')

                if (userId) {

                    // Create a new password hash and salt
                    const setPassword = crypt.createPassword(newPassword)
                    const salt = (await setPassword).salt
                    const hash = (await setPassword).hash

                    const user = await User.findOneAndUpdate({ userId: userId.userId }, { salt: salt, hash: hash }, { new: true })

                    if (user) {
                        res.status(200).send('password_updated')
                    } else {
                        res.status(401).send('Failed to update password')
                    }
                } else {
                    res.status(401).send('Invalid user')
                }
            }
        } catch (error) {
            console.log(error)
            res.status(401).send('Failed to update password')
        }
    })

router
    .route('/forgetpassword')
    .post(async (req, res) => {
        const { email } = req.body

        const user = await User.findOne({email}, '-urlNos -salt -hash -_id')

        if(user) {

            const otpIndb = await VerifyOTP.findOne({ email }, '-_id')

            if (otpIndb != null) {
                await VerifyOTP.findOneAndDelete({ email: email })
            }

            const otp = mail.sendMail(user)

                const userId = user.userId

                verifyOTP = new VerifyOTP({
                    otp,
                    userId,
                    email
                })

                await verifyOTP.save()

                res.status(200).send('If the email is registered, an OTP will be send to the email')
        }else {
            res.status(200).send('If the email is registered, an OTP will be send to the email')
        }
    })

    router
    .route('/forget/updatepassword')
    .post(async (req, res) => {
        try {
            const { email, newPassword } = req.body

            if (newPassword == '') {
                res.status(401).send('Failed to update password')
            } else {
                // Create a new password hash and salt
                const setPassword = crypt.createPassword(newPassword)
                const salt = (await setPassword).salt
                const hash = (await setPassword).hash

                const user = await User.findOneAndUpdate({ email }, { salt: salt, hash: hash }, { new: true })

                if (user) {
                    res.status(200).send('password_updated')
                } else {
                    res.status(401).send('Failed to update password')
                }
            }
        } catch (error) {
            console.log(error)
            res.status(401).send('Failed to update password')
        }
    })

module.exports = router