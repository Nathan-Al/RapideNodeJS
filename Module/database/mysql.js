const mysql = require('mysql');
// ---------------------------
let { Connexion } = require('./class/connexion')
let response = {result:undefined, connection:undefined};
const connectionSql = mysql.createConnection({
    host:process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database:process.env.DATABASE_NAME,
    charset:process.env.MYSQL_CHARSET,
    port:process.env.DATABASE_PORT,
    debug:process.env.MYSQL_DEBUG === 'true' ? true : false,
    timezone:process.env.MYSQL_TIMEZONE
})

/**
 * @typedef {Object} MysqlObject
 * @property {boolean} result If the connection is successful
 * @property {mysql.Connection} connection - Mysql connection Object
 * 
 * @returns {MysqlObject} Object { result : boolean, connection : mysql.Connection }
 * @throws {mysql.MysqlError} MysqlError
 */
async function main() {
    let connexion = new Connexion();

    await createDatabaseConnection().then((connectionResult) => {
        if(connectionResult!=undefined) {
            connexion = connectionResult.result;
        }
        else
            connexion = false
    }).catch(err => console.error(err));

    return connexion;
}

exports.mysqlCo = main;

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
async function createDatabaseConnection() {
    try {
        //Test that it's possible to connect to the database 
        //before connect to it
        verifyCo()
        //Create a promise for the connection
        return new Promise(async function(resolve, reject) {
            connectionSql.connect(function(err) {
                if (err) {
                    console.error(err)
                    response.result = false
                    reject(err);
                } else {
                    response.connection = connectionSql;
                    response.result = true;
                    resolve(response);
                }
            })
        })
    } catch (error) {
        console.log(error)
        return false
    }
}

/**
 * @throw MYSQL ERROR
 * @returns boolean | Mysql Error
 */
async function verifyCo() {
    return new Promise(async function(resolve, reject) {
        connectionSql.ping(err=>{
            if(err) {
                console.log(err)
                reject(err)
            } else {
                connectionSql.end()
                resolve(true)
            }
        })
    })
}

exports.verifyMysqlConnection = verifyCo