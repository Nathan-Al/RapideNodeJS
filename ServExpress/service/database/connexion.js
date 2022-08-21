var mysql = require('mysql');
var sqlite = require('sqlite-sync');
const path = require('path');
// ---------------------------
let { Connexion } = require('./class/connexion')
let response = {result:undefined, connection:undefined, type:undefined};

/**
 * @typedef {Object} MysqlObject
 * @property {boolean} result If the connection is successful
 * @property {mysql.Connection} connection - Mysql connection Object
 * 
 * @param {Array} bddInfo Object {type : string, sqlite : object, mysql : object}
 * 
 * @returns {MysqlObject} Object { result : boolean, connection : mysql.Connection }
 * @throws {mysql.MysqlError} MysqlError
 */
async function getMysqlDatabase(bddInfo)
{
    let connexion = new Connexion();

    await CreateDatabaseConnection(bddInfo).then((connectionResult) => {
        if(connectionResult!=undefined)
            connexion = connectionResult.result;
        else
            connexion = false
    }).catch(err => console.log(err));

    return connexion;
}

exports.mysqlCo = getMysqlDatabase;

/**
 * A function that create the database connection 
 *
 * @param {Object} databaseInfo Object who containt the mysql connection parameter
 * @param {String} databaseInfo.host The hostname of the database you are connecting to. (Default: localhost)
 * @param {String} databaseInfo.database The database name
 * @param {String} databaseInfo.user The user name used for the database connection
 * @param {String} databaseInfo.password The password for user database
 * 
 * @typedef {Object} Response
 * @property {boolean} result If the connection is successful
 * @property {mysql.Connection} connection - Mysql connection Object
 * 
 * @returns {(Promise|Response)} Mysql Promise or Mysql Object
 * @throws {mysql.MysqlError} MysqlError
 */
async function CreateDatabaseConnection(databaseInfo) {
    let connectionSql = mysql.createConnection({
        host:databaseInfo.host,
        user:databaseInfo.user,
        password:databaseInfo.password,
        database:databaseInfo.database
    });

    let connectPromise = new Promise(async function(resolve, reject) {
        connectionSql.connect(async function(err) {
            if (err) {
                response.result = false
                reject(err);
            } else {
                resolve();
            }
        });
    });

    await connectPromise.then(async function(result) {
        connectionSql.ping()
        response.connection = connectionSql;
        response.result = true;
        return response;
    }).catch(err=> {return err})
}

/**
 * Create a connection to a SQLITE database
 * 
 * @typedef {Object} SqlitelObject
 * @property {boolean} result If the connection is successful
 * @property {mysql.Connection} connection - Mysql connection Object
 * @param {SqlitelObject} bddInfo Object {type : string, sqlite : object, sqlite : object}
 * 
 * @returns SqliteObject | Error
 */
function getSqliteDatabase(bddInfo) {
    if(bddInfo.name === '' || bddInfo.name === undefined || typeof bddInfo.name != 'string') {
        response.connection = undefined;
        response.result = false;
    } else {
        let dbPath ='ServExpress/database/'+bddInfo.name+'.db';
        response.connection = sqlite.connect(dbPath);
        response.result = true;
    }

    return response;
}

exports.sqliteCo = getSqliteDatabase;