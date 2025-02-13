const {LecteurFichiers} = require('../../../Tools/files')
//---------------------------------
const logsServerPath = (__dirname+'/ServExpress/Logs/server.txt')
const logsDatabasePath = (__dirname+'/ServExpress/Logs/database.txt')

/**
 * @description Main fils to handle the server logs
 * @task Find a way to connect to the pipeline of express JS and write to files log
 * @param {Object} option Change the way of the logs working
 */
function Main(option) {
    if(option.devmod) {
        cmdLogs()
    }
    try {
        writeLogs()
    } catch (error) {
        return error
    }
}

exports.Main = Main;

/**
 * @description Write all the log in the cmd console
 */
function cmdLogs () {
    console.log('[server] '+ Date.now())
}

/**
 * @description Write all the logs in the write log file
 * 
 * @param {Object} data 
 */
function writeLogs(data) {
    LecteurFichiers.Fichier.creer()
    fs.writeFile(logsServerPath, data);
}
