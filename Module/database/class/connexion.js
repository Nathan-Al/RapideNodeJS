class Connexion {

    /**
     * @public {mysql.Connection} connection - Mysql connection Object
     */
    connection = undefined
    /**
     * @public {String} The type of connection to a database used
     */
    type = undefined
    /**
     * @public {String} The connection stat
     */
    stat = undefined

    constructor(connection, type, stat) {
        this.connection = connection
        this.type = type
        this.stat = stat
    }
}

exports.Connexion = Connexion