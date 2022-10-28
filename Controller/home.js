const database = require('../Module/database/main')
/**
 * @typedef {Object} serverObject
 * @property {boolean|string} parameter - All the parameter concerning the redirection and choose of the view (refer to the doc for more informations)
 * @property {any} datas - The informations that need to be send to the view. (If you need more informations efer to the doc)
 * 
 * @param {Object} serverDatas The datas send by the user from the view
 * @param {serverObject} serverObject A object create by the server for ease of use of the server parameter and datas that need to be send
 */
module.exports.Controller = async function Controller(serverDatas, serverObject) {
    serverObject.datas.port = process.env.PORT
    serverObject.datas.devmod = process.env.DEV
    serverObject.datas.serverState = 'Not Send';
    serverObject.datas.databaseState = await database.verifyConnection()? 'Yes':'No'

    console.log(serverDatas, serverObject)
    return serverObject;
};
