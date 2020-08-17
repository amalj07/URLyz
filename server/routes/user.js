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

// @route POST /api/user/user_account/verify
// @desc Verify the user account
router
    .route('/user_account/verify')
    .post(async(req, res) => {
        try {
            const { otp, email } = req.body

            const userId = await User.findOne({ email }, 'userId -_id')

            const verifyOtp = await VerifyOTP.findOne({ userId: userId.userId, valid: true})

            if(verifyOtp != null) {
                if(verifyOtp.otp == otp && verifyOtp.email == email) {
                    await VerifyOTP.updateOne({otp: otp}, {valid: false})
                    await User.updateOne({ userId: userId.userId }, {verified: true})
    
                    res.status(200).send('user account verified')
                } else {
                    res.status(200).send('user verification failed')
                }
            } else {
                res.status(200).send('Invalid otp')
            }

        } catch (error) {
            res.status(200).send('failed to verify account')
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
            
            if(user) {
                const validPassword = crypt.checkPassword(password, user.salt, user.hash)
                if(validPassword == true){
                    if(user.verified == true) {
                        const id = crypt.encrypt(user.userId)
                        const token = id.slice(0,16)
                        const sid = uid.sid()
                        
                        session = new Session({
                            sid: sid,
                            uid: user.userId,
                            token: token
                        })

                        await session.save()

                        res.status(200).json({STATUS: 'SUCCESS', MSG: 'login_success', user: {
                            sid: sid,
                            token: token,
                        }})
                    } else{
                        res.status(200).json({STATUS: 'SUCCESS', MSG: 'unverifed_account'})
                    }
                } else {
                    res.status(400).send('Invalid credentials')
                }
            } else {
                res.status(400).send('Invalid credentials')
            }
        } catch (error) {
            res.status(400).send('failed to login')
        }
    })

// @route POST /api/user/user_account/resendotp
// @desc Resend the otp
router
    .route('/user_account/resendotp')
    .post(async(req, res) => {
        try {
            const { email } = req.body

            const user = await User.findOne({ email }, 'userId name email -_id')
            
            // Check if the user already have an otp in db
            const otpIndb = await VerifyOTP.findOne({email}, '-_id')

            if(user != null) {
                if(otpIndb != null) {
                    await VerifyOTP.updateOne({email: email}, {valid: false})
                }
                const otp = mail.sendMail(user)
    
                const userId = user.userId
                const emial =user.email
                verifyOTP = new VerifyOTP({
                    otp,
                    userId,
                    email
                })
                
                await verifyOTP.save()
    
                res.status(200).send(`OTP send to ${email}`)
            }
            
        } catch (error) {
            res.status(400).send('failed to send otp')
        }       
    })

// @route POST /api/user/authenticate
// @desc Authenticate user at request
router
    .route('/authenticate')
    .post(async (req, res) => {
        try {
            const { sid, token } = req.body
            console.log(token)
            // TODO: create diffrent token for user. encrypting userid will give only same token. change token 
            // TODO: the same user at different times. user another method for token generation like sid
            const userSession = await Session.findOne({ sid }, '-_id')
            console.log(userSession)
            if(userSession != null) {
                if(token == undefined) {
                    res.status(200).send({status: 'FAIL'})
                }else {
                    if(userSession.token == token) {
                        res.status(200).send({status: "SUCCESS"})
                        console.log('sucess')
                    }else {
                        res.status(200).send({status: 'FAIL'})
                    }
                }
            }else {
                res.status(200).send({status: 'FAIL'})
            }
        } catch (error) {
            console.log(error)
        }
    })

module.exports = router