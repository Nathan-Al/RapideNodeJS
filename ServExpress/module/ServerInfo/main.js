let { Server } = require('./class/ServerInfo')

function Main (request = undefined) {
    let response = undefined
    switch (request) {
        case 'infos':
            response = Informations()
            break;
        default:
            response = 'No found'
    }

    return response
}

exports.Main = Main

function Informations() {
    let server = new Server()
    return server.Informations;
}