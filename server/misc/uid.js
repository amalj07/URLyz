const process = require('process')

// Create a unique userid
exports.uid = () => {
    var year = new Date().getFullYear().toString().slice(-2)
    var month = new Date().getMonth() + 1
    var date = new Date().getDate().toString()
    var time = new Date().getTime().toString().slice(-8)
    var pid = process.pid.toString().slice(-4)
    if (month <= 9) {
        month = "0" + month.toString()
    } else {
        month = month.toString()
    }

    var userId = "U" + year + month + date + time + pid;
    return userId
}