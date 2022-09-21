const sqlite = require('sqlite-sync');
const sqlite3 = require('sqlite3');
// ----------------------------
const sqliteVersion = parseInt(process.env.SQLITE_VERSION, 10)
const databasePath = process.env.SQLITE_PATH

/**
 * Return a mysqlite object for a connection
 * 
 * @param {Object} option Database choosen options {async=boolean}
 * @returns Error || SqliteObject
 */
function main(option={async:false}) {
    let mysqliteObject = undefined

    switch (sqliteVersion) {
        case 1:
            mysqliteObject = getAsyncSqliteDatabase()
            break
        case 3:
            mysqliteObject = getSqlite3Database()
            break
        default:
            throw new Error('Bad sqlite version chosen, it\'s may not be supported check the documentation')
    }

    return mysqliteObject
}

exports.sqliteCo = main;

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
 function getAsyncSqliteDatabase() {
    if(process.env.DATABASE_NAME === '' || process.env.DATABASE_NAME === undefined || typeof process.env.DATABASE_NAME != 'string') {
        response.connection = undefined;
        response.result = false;
    } else {
        let dbPath = SQLITE_PATH+process.env.DATABASE_NAME+'.db';
        response.connection = sqlite.connect(dbPath);
        response.result = true;
    }

    return response;
}

async function getSqlite3Database() {
    const newdb = await new sqlite3.Database(databasePath, (err) => {
        if (err) {
            console.log(err);
            exit(1);
        }
    });

    return newdb
}

/**
 * @throw SQLITE ERROR
 * @returns boolean | Sqlite Error
 */
 async function verifyCo() {
    return new Promise(async function(resolve, reject) {
        //TODO make a function that verify if it's possible to connect to the database
    })
}

exports.verifySqliteConnection = verifyCo
