const nodemailer = require('nodemailer')
const config = require('../config/config')
const { response } = require('express')
const { use } = require('../routes/user')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.mail.user,
        pass: config.mail.pass
    }
})

exports.sendMail = (user) => {
    try {
        // Create s six charecter OTP
        function makeOTP() {
            var result = '';
            var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            var charactersLength = 6;
            for (var i = 0; i < 6; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        }
    
        const OTP = makeOTP()
    
        // Configure mail credentials and message
        const mailOptions = {
            from: config.mail.user,
            to: user.email,
            subject: 'URLyz account confirmation',
            text: `Hello ${user.name}, ${OTP} is the OTP for verifiying your account. OTP will be valid only for 10 minutes.`
        }
    
        // Send mail to the user
        transporter.sendMail(mailOptions, (error, info) => {
            if (error)
                throw error
            return info.response
        })
    
        return OTP
    } catch (error) {
        console.log(error)
    }
}

exports.sendSupportMail = (support) => {
    try {
    
        // Configure mail credentials and message
        const mailOptions = {
            from: config.mail.user,
            to: support.email,
            subject: `Case ${support.supportId} URLyz issue`,
            text: `Hello ${support.name}, We've create a new support issue with support Id ${support.supportId}. We will contact you soon.`
        }
    
        // Send mail to the user
        transporter.sendMail(mailOptions, (error, info) => {
            if (error)
                throw error
            return info.response
        })
    
        return OTP
    } catch (error) {
        console.log(error)
    }
}