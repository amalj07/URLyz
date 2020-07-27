const mongoose = require('mongoose')

const verifyOTPSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: new Date(),
        expires: 7200
    },
    otp: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
})

const VerifyOTP = mongoose.model('verifyotps', verifyOTPSchema)
module.exports = VerifyOTP