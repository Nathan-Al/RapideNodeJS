//todo use that classe to define a default object to return service informations
class Service {

  /**
   * @type {String}
   */
  name = ''
    /**
   * @type {String}
   */
  etat = ''
    /**
   * @type {Boolean}
   */
  reachable = false

    constructor(name, etat, reachable) {
        this.name = name
        this.etat = etat
        this.reachable = reachable
      }
}

exports.Service = Service
