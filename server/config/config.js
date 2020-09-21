module.exports = {
    DB: {
        mongoURI: process.env.MONGO_URI
    },
    baseUrl: {
        baseurl: process.env.BASE_URL 
    },
    mail: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
}