const crypto = require('crypto')
const { text } = require('express')

exports.createPassword = async (password) => {
    // Create unique salt for every user
    const salt = crypto.randomBytes(16).toString('hex')

    // Hashing user's salt and password with 1000 iterations
    const key = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512')
    const hash = key.toString('hex')

    const cryptDetails = {
        salt: salt,
        hash: hash
    }
    return cryptDetails
}

exports.checkPassword = (password, salt, hash) => {
    // Create hash using users password
    var key = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512')
    key = key.toString('hex')

    // Verify if the original hash and login attempt hash are same
    if (key == hash) {
        return true
    } else {
        return 'incorrect password'
    }
}

// encrypts userid
exports.encrypt = text => {
    var mykey = crypto.createCipheriv('aes-128-cbc', 'aICt27c@v9y#');
    var mystr = mykey.update(text, 'utf8', 'hex')
    mystr += mykey.final('hex');
    return mystr
}

// decrypts userid
exports.decrypt = text => {
    var mykey = crypto.createDecipheriv('aes-128-cbc', 'aICt27c@v9y#');
    var mystr = mykey.update(text, 'hex', 'utf8')
    mystr += mykey.final('utf8');
    return mystr;
}