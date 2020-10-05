const express = require('express')
const crypto = require('crypto')
const router = express.Router()
const uid = require('../misc/uid')
const crypt = require('../misc/crypt')
const mail = require('../misc/mail')

// Import models
const User = require('../models/User')
const VerifyOTP = require('../models/verifyOTP')
const Session = require('../models/Session')

// @route POST /api/user/user_register
// @desc Register new user
router
    .route('/user_register')
    .post(async (req, res) => {
        try {
            // Check if req body is not empty
            if (!req.body.name || !req.body.email || !req.body.password) {
                res.status(401).send('Failed to regiester user')
            } else {

                const { name, email, password } = req.body

                const existingUser = await User.findOne({ email })
                if (existingUser) {
                    res.status(401).send('Email already registered')
                } else {
                    // Create a new userId
                    const userId = uid.uid('user')

                    // Create a new password hash and salt
                    const setPassword = crypt.createPassword(password)
                    const salt = (await setPassword).salt
                    const hash = (await setPassword).hash

                    // Create a new user model to save to db
                    user = new User({
                        userId,
                        name,
                        email,
                        salt,
                        hash
                    })

                    await user.save()

                    // Send otp to user email
                    const otp = mail.sendMail(user)
                    // Create new otp model to save to db
                    verifyOTP = new VerifyOTP({
                        otp,
                        userId,
                        email
                    })

                    await verifyOTP.save()

                    res.status(200).send('User registered')
                }

            }
        } catch (error) {
            console.log(error)
            res.send(401).send('Failed to register user')
        }
    })

// @route POST /api/user/user_account/verify
// @desc Verify the user account
router
    .route('/user_account/verify')
    .post(async (req, res) => {
        try {
            const { otp, email } = req.body

            const userId = await User.findOne({ email }, 'userId -_id')

            const verifyOtp = await VerifyOTP.findOne({ userId: userId.userId, valid: true })

            if (verifyOtp != null && verifyOtp.otp == otp) {
                if (verifyOtp.email == email) {
                    await VerifyOTP.deleteOne({ otp: otp })
                    await User.updateOne({ userId: userId.userId }, { verified: true })

                    res.status(200).send('Account verified succesfully')
                } else {
                    res.status(401).send('Failed to veriy user')
                }
            } else {
                res.status(401).send('Invalid OTP')
            }

        } catch (error) {
            res.status(401).send('Failed to veriy user')
        }
    })

// @route POST /api/user/user_login
// @desc Login the user
router
    .route('/user_login')
    .post(async (req, res) => {
        try {
            const { email, password } = req.body

            const user = await User.findOne({ email }, '-_id')

            if (user) {
                const validPassword = crypt.checkPassword(password, user.salt, user.hash)
                if (validPassword == true) {
                    if (user.verified == true) {
                        const token = uid.token()
                        const sid = uid.sid()

                        session = new Session({
                            sid: sid,
                            userId: user.userId,
                            token: token
                        })

                        await session.save()


                        res.cookie("sid", sid)
                        res.cookie("t", token)
                        res.status(200).send("login_success")

                    } else {
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

                        res.status(401).send('Account not verified')
                    }
                } else {
                    res.status(401).send('Invalid email or password')
                }
            } else {
                res.status(401).send('Invalid email or password')
            }
        } catch (error) {
            console.log(error)
            res.status(401).send('failed to login')
        }
    })

// @route POST /api/user/user_account/resendotp
// @desc Resend the otp
router
    .route('/user_account/resendotp')
    .post(async (req, res) => {
        try {
            const { email, type } = req.body

            const user = await User.findOne({ email }, 'userId name email -_id')

            // Check if the user already have an otp in db
            const otpIndb = await VerifyOTP.findOne({ email }, '-_id')

            if (user != null) {
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

                res.status(200).send(`OTP send to ${email}`)
            } else {
                if(type == 'PUPDT'){
                    res.status(401).send("If the email is registered, an OTP will be send to the email")
                }else{
                    res.status(401).send("Invalid email")
                }
            }

        } catch (error) {
            res.status(401).send('Failed to send otp')
        }
    })

// @route POST /api/user/authenticate
// @desc Authenticate user at request
router
    .route('/authenticate')
    .post(async (req, res) => {
        try {
            const { sid, token } = req.body
            const userSession = await Session.findOne({ sid }, '-_id')
            if (userSession != null) {
                if (token == undefined) {
                    res.status(200).send({ status: 'FAIL' })
                } else {
                    if (userSession.token == token) {
                        res.status(200).send({ status: "SUCCESS" })
                    } else {
                        res.status(200).send({ status: 'FAIL' })
                    }
                }
            } else {
                res.status(200).send({ status: 'FAIL' })
            }
        } catch (error) {
            console.log(error)
        }
    })

// @route POST /api/user/forgetpassword
// @desc Verify the user (email) before updating password
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

// @route POST /api/user/forget/updatepassword
// @desc Update password of the user (password recovery)
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

// @route POST /api/user/logout
// @desc Logout the user
router
    .route('/logout')
    .get(async (req, res) => {
        try {
            const { sid, t } = req.cookies

            await Session.deleteOne({ sid: sid, token: t }).exec()
            res.cookie("sid", "", {maxAge: "1"})
            res.cookie("t", "", {maxAge: "1"})
            res.status(200).send("SUCCESS")
        } catch (error) {
            console.log(error)
            res.status(401).send("Failed to logout user")
        }
    })


module.exports = router