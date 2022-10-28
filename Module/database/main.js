const mysql = require('./mysql')
const sqlite = require('./sqlite')
// ---------------------------
const connexionType = process.env.DATABASE_TYPE

/**
 * Return a database object connection
 * 
 * @returns {Object} Connexion | boolean
 */
async function main (option = undefined) {
    let connexionObject = undefined
    //TODO handle option for the database

    switch (connexionType) {
        //TODO handle the error response with the error
        case 'sqlite':
            try {
                connexionObject = await sqlite.sqliteCo()
            } catch (error) {
                console.error(error)
                return false
            }
            break
        case 'mysql':
            try {
                connexionObject = await mysql.mysqlCo()
            } catch (error) {
                console.error(error)
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

    return connexionObject
}

exports.main = main

/**
 * @description Verify if it possible to connect to the database with meta.json file informations
 * @returns Boolean
 */
async function verifyConnection () {
    let response = undefined
    switch (connexionType) {
        //TODO handle the error response with the error
        case 'sqlite':
            response = await main()
            response.connection.close((err) => {
                if (err) {
                    console.error(err.message)
                    return false
                } else {
                    return true
                }
            })
            break
        case 'mysql':
            try {
                return await mysql.verifyMysqlConnection()
            } catch (error) {
                return false
            }
        default:
            return false
    }
}

exports.verifyConnection = verifyConnection