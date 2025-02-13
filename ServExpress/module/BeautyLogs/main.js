
/**
 * 
 * @param {String} message The message in full string that you want to show in the log
 * @param {Number} number The number of iterations you want for the '-' character
 */
exports.bLogs = function main(message = 'logs msg', number = 40) {
    if(message.startsWith('\n'))
        message = message.replace('\n','')
    message = message.replaceAll('\n','\n-*')
    let messageClean = ''
    let messageSplit = message.split('-*')

    messageSplit.forEach((item, index) => {
        if(index===messageSplit.length-1)
            item = item.trimEnd()
        if(item!='' && item.match(/[A-Za-z0-?]/))
            messageClean+=item.trimStart()
    })

    line(false, number)
    console.log(messageClean)
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