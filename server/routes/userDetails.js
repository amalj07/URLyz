const express = require('express')
const router = express.Router()

// Import Models
const User = require('../models/User')
const Session = require('../models/Session')

router
    .route('/updateuser')
    .post(async (req, res) => {
        try {
            const { sid, token, data, type } = req.body
            console.log(type)
            
            const userId = await Session.findOne({ sid: sid, token: token }, '-_id -sid -token')
            
            if(userId) {
                if(type == 'name') {
                    let response = await User.findOneAndUpdate({ userId: userId.userId }, { name: data}, {new: true})
                    const user = {
                        name: response.name,
                        email: response.email,
                        urlNos: response.urlNos
                    }
                    res.status(200).send(user)
                }else if(type == 'email'){
                    let response = await User.findOneAndUpdate({ userId: userId.userId }, { email: data}, {new: true})
                    const user = {
                        name: response.name,
                        email: response.email,
                        urlNos: response.urlNos
                    }
                    res.status(200).send(user)
                }
            }else {
                res.status(401).end()
            }
        } catch (error) {
            console.log(error)
        }

        
    })

module.exports = router