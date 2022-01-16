
/**
 * 
 * @param {String} message The message in full string that you want to show in the log
 * @param {Number} number The number of iterations you want for the '-' character
 */
exports.bLogs = function main(message = 'logs msg', number = 40) {
    line(false, number)
    console.log(message)
    line(true, number)
}

/**
 * @description console log a bunch of '-' character to separate log msg
 * 
 * @param {Boolean} newline To create a newline after the console log
 * @param {Number} number The number of iterations you want for the '-' character
 * @returns {void}
 */
function line(newline = false, number = 40)
{
    let str = '-'
    str = str.repeat(number)
    if(newline)
        str.concat('\n')

    console.log(str)
}

exports.bLine = line;