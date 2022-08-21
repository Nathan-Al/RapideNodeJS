const fs = require("fs")
let connexion = require('./connexion')

/**
 * @param {Object} meta Json meta datas or personal define Object 
 * @returns Connexion (Object) | boolean
 */
async function Main (meta = undefined, option = undefined) {
    //todo handle everything concernning database connection
    if(meta === undefined) {
        meta = JSON.parse(fs.readFileSync('./ServExpress/meta.json'));
    }

    let connexionType = meta.database.type;
    let connexionObject = undefined;

    //TODO handle option for the database
    // if(option != undefined)
    // {
        
    // }

    switch (connexionType) {
        //TODO handle the error response with the error
        case 'sqlite':
            try {
                connexionObject = connexion.sqliteCo(meta.database.sqlite);
                connexionObject.type = connexionType;
            } catch (error) {
                return false
            }
            break
        case 'mysql':
            try {
                connexionObject = connexion.mysqlCo(meta.database.mysql)
                connexionObject.type = connexionType;

            } catch (error) {
                return false
            }
            break
        case 'mariadb':
            //TODO handle maria db connection
            break
        case 'mongodb':
            //TODO possible mongo db use in the future
            break
        default:
            return false;
    }
}

exports.Main = Main

/**
 * @description Verify if it possible to connect to the database with meta.json file
 * @returns Boolean
 */
exports.verifyConnection = async function () {
    if (await Main(JSON.parse(fs.readFileSync('./ServExpress/meta.json')))) {
        return true
    }
}