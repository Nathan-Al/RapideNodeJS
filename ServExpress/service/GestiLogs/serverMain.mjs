/**
 * @description Main logs handle made in a way of a Javascript module
 * 
 * @param {String} message Server request logs
 * @returns {Function} any
 */
module.exports = function (message) {
    return function (req, res, next) {
        Main(serviceObject.service, serviceObject.parameter)
        next()
    }
}

function Main() {
    //function
}
