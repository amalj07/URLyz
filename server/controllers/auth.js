const Session = require('../models/Session')

const isAuthenticated = async function(req, res, next) {
    const { sid, t } = req.cookies

    if(sid != undefined && t!= undefined) {
        const userId = await Session.findOne({ sid: sid, token: t}, '-sid, -t, -_id')
        
        if(userId) {
            req.userId = userId.userId
            req.user = true
        } else {
            res.cookie("sid", "", {maxAge: "1"})
            res.cookie("t", "", {maxAge: "1"})
            res.status(401).send("Invalid user")
        }
    } else {
        res.cookie("sid", "", {maxAge: "1"})
        res.cookie("t", "", {maxAge: "1"})
        res.status(401).send("Invalid user")
    }
    next()
}

module.exports = isAuthenticated