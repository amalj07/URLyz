const express = require('express')
const router = express.Router()
const crypt = require('../misc/crypt')

// Import Models
const User = require('../models/User')
const Url = require('../models/Url')


// @route POST /api/user_details/fetchuser
// @desc Fetch user details
router
    .route('/fetchuser')
    .get(async (req, res) => {
        try {
            const user = await User.findOne({ userId: req.userId }, '-_id -userId -salt -hash -verified')
            res.status(200).send(user)
        } catch (error) {
            res.status(401).send('Failed to fetch user data')
        }
    })

// @route POST /api/user_details/updateuser
// @desc Update details of user
router
    .route('/updateuser')
    .post(async (req, res) => {
        try {
            const { data, type } = req.body

            if (type == 'name') {
                let response = await User.findOneAndUpdate({ userId: req.userId }, { name: data }, { new: true })
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
        } catch (error) {
            console.log(error)
            res.end()
        }
    })

// @route POST /api/user_details/verifypassword
// @desc Verify the password of user before updating password
router
    .route('/verifypassword')
    .post(async (req, res) => {
        try {
            const { password } = req.body

            const user = await User.findOne({ userId: req.userId }, '-_id')

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
        } catch (error) {
            console.log(error)
            res.status(401).send("Failed to verify password")
        }
    })

// @route POST /api/user_details/updatepassword
// @desc Update password of the user
router
    .route('/updatepassword')
    .post(async (req, res) => {
        try {
            const { newPassword } = req.body

            if (newPassword == '') {
                res.status(401).send('Failed to update password')
            } else {
                // Create a new password hash and salt
                const setPassword = crypt.createPassword(newPassword)
                const salt = (await setPassword).salt
                const hash = (await setPassword).hash

                const user = await User.findOneAndUpdate({ userId: req.userId }, { salt: salt, hash: hash }, { new: true })

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

// @route POST /api/user_details/delete_account
// @desc Delete account of user and delete all data associated with the user
router
.route('/delete_account')
.post(async (req, res) => {
    try {
        const { password } = req.body

        const user = await User.findOne({ userId: req.userId }, '-email -name -urlNos -verified -userId-_id')

        if (user) {
            const validPassword = crypt.checkPassword(password, user.salt, user.hash)

            if (validPassword == true) {
                const deleteUrls = await Url.deleteMany({ userId: req.userId})
                const deleteUser = await User.findOneAndDelete({ userId: req.userId })
                if (deleteUser) {
                    res.cookie("sid", "", {maxAge: "1"})
                    res.cookie("t", "", {maxAge: "1"})
                    res.status(200).send("user_deleted")
                } else {
                    res.status(401).send("Failed to delete user")
                }

            } else {
                res.status(401).send("Invalid password")
            }
        } else {
            res.status(401).send("Invalid user")
        }
    } catch (error) {
        console.log(error)
        res.status(401).send("Failed to delete user")
    }
})

module.exports = router