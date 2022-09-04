const fs = require("fs")
const nodProc = require('node:process');
const {exec} = require('child_process')
//-------------------------------------
const server = require('./server/main')

/**
 * Process the possible parameter given when the server is started
 * @param {Array} parameter 
 * @returns {Array} constant Array
 */
function main (parameter) {
    let metaJsonFile = JSON.parse(fs.readFileSync('./ServExpress/meta.json'))

    if(parameter[2]==='dev') {
        metaJsonFile.server.port = 4445
        metaJsonFile.server.devmode = true
        process.env.NODE_ENV = 'development'
    }

    const meta = metaJsonFile
    return meta
}

server.Main(main(nodProc.argv))
