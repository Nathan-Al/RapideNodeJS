var mysql = require('mysql');
const fs = require("fs")

/**
 * @typedef {Object} MysqlObject
 * @property {boolean} result If the connection is successful
 * @property {mysql.Connection} connection - Mysql connection Object
 * 
 * @returns {MysqlObject} Object { result : boolean, connection : mysql.Connection }
 * @throws {mysql.MysqlError} MysqlError
 */
async function getDatabaseConnection()
{
    let bdd_info = JSON.parse(fs.readFileSync('./meta.json'));
    let response = undefined;

    await CreateDatabaseConnection(bdd_info.database).then((result) => {
        response = result.result;
    }).catch(err => console.log(err));

    return response;
}

exports.MySQLCo = getDatabaseConnection;

/**
 * @param {Object} database_info Object who containt the mysql connection parameter
 * @param {String} database_info.host The hostname of the database you are connecting to. (Default: localhost)
 * @param {String} database_info.database The database name
 * @param {String} database_info.user The user name used for the database connection
 * @param {String} database_info.password The password for user database
 * 
 * @typedef {Object} Response
 * @property {boolean} result If the connection is successful
 * @property {mysql.Connection} connection - Mysql connection Object
 * 
 * @returns {(Promise|Response)} Mysql Promise or Mysql Object
 * @throws {mysql.MysqlError} MysqlError
 */
async function CreateDatabaseConnection(database_info) {
    let response = {result:undefined,connection:undefined};
    var connection_sql = mysql.createConnection({
        host:database_info.host,
        user:database_info.user,
        password:database_info.password,
        database:database_info.database
    });

    var connectPromise = new Promise(async function(resolve, reject) {
        connection_sql.connect(async function(err) {
            if (err) {
                reject(err);
            } else {
                resolve(true);
            }
        });
    });

    await connectPromise.then(async function(result) {
        response.connection = connection_sql;
        response.result = true;
    }).catch(err=> {return err})

    return response;
}