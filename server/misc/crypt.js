const crypto = require('crypto')

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