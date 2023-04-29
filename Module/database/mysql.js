const mysql = require('mysql');
// ---------------------------
let { Connexion } = require('./class/connexion')

function connectionSql () {
    let connexion = new Connexion();

    connexion.connection = mysql.createConnection({
        host:process.env.DATABASE_HOST,
        user:process.env.DATABASE_USER,
        password:process.env.DATABASE_PASSWORD,
        database:process.env.DATABASE_NAME,
        charset:process.env.MYSQL_CHARSET,
        port:process.env.DATABASE_PORT,
        debug:process.env.MYSQL_DEBUG === 'true' ? true : false,
        timezone:process.env.MYSQL_TIMEZONE
    })
    connexion.stat = connexion.connection.state
    connexion.type = 'MySql'

    return connexion
}

exports.mysqlCo = connectionSql;

/**
 * @throw MYSQL ERROR
 * @returns boolean | Mysql Error
 */
 async function verifyCo() {
    return new Promise(async function(resolve, reject) {
        connectionSql().connection.ping(err=>{
            if(err) {
                console.log(err)
                reject(err)
            } else {
                resolve(true)
            }
        })
    })
}

exports.verifyMysqlConnection = verifyCo
