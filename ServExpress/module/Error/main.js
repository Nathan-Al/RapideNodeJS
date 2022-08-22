const Error = require('./Error')
const rendering = require('../../server/rendering.js')
const beautyLogs = require('../BeautyLogs/main');

/**
 * 
 * @param {*} response 
 * @param {*} error 
 * @param {*} message 
 * @param {*} code 
 */
 exports.main = (response, error, message, code) => {

    let errorDatas = {njsEror: error, njsMsg: message, njsCode: code, pagename:'Error'}
    response.status(code)

    beautyLogs.bLogs
        (`
            -The error have been handle but it can still stop the application from running normaly-
            ERROR : ${error}
            MESSAGE : ${message}
        `)

    rendering.rendering(response, 'internal/error/error.ejs', errorDatas, true)
}

