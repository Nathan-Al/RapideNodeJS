class Connexion {
   /**
    * @public {boolean} result If the connection is successful
    */
    result = undefined
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

    constructor(result, connection, type, stat) {
        this.result = result
        this.connection = connection
        this.type = type
        this.stat = stat
    }
}

exports.Connexion = Connexion