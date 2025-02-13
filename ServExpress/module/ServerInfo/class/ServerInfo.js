const fs = require("fs")
/**
 * @description Class Server contain all the informations about the server
 */
class ServerInfo {

  /**
   * @type Project name
   */
    name = ''
    version =''
    /**
     * @type {Object}
     */
    dependencies = {}
    description = ''
    repository = ''
    author = ''
    /**
     * @type {String}
     */
    license = ''

    /**
     * @type {Array[String]}
     */
    static langage = ['Python','JavaScript','NodeJS','SQL']

    /**
     * @description Return a Object with all the server informations
     * @returns this 
     */
    get Informations () {
      let fichier = fs.readFileSync(`package.json`)
      let fichierJson = JSON.parse(fichier)

      for (let key in fichierJson) {
        if (key!='scripts')
        {
          eval('this.'+key+'=fichierJson.'+key);
        }
    }
      return this
    }
}

exports.Server = ServerInfo
