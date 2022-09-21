const fs = require("fs")
const nodProc = require('node:process');
require('dotenv').config();
//-------------------------------------
const server = require('./server/main')

/**
 * Process the possible parameter given when the server is started
 * @param {Array} parameter 
 * @returns {Array} constant Array
 */
function main (parameter) {
    if(parameter[2]==='dev') {
        process.env.PORT = 4445
        process.env.NODE_ENV = 'development'
    }
}

server.Main(main(nodProc.argv))
