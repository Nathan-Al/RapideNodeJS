
const { Container } = require('./container/main')
const Service = require('./class/Service')
const GestiLogs = require('./GestiLogs/main')
const SqlDatabases = require('./database/main')
const Server = require('../server/main');

function Main () {
    console.log("[service] Lauch main container")
    Container(Server,{port:port})
    console.log("[service] Lauch server")
}

exports.Main = Main

/**
 * 
 * @returns {Boolean} True or False ff the service is up or down.
 */
function watch(Service) {
    let response
    return response
}

/**
 * @description Start the server who is another service
 * @param {Number} port 
 */
function startServer (port) {
    try {
        return Server.start(port);
    } catch (error) {
        return error
    }
}