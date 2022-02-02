const Info = require("../module/ServerInfo/ServerInfo")

/**
 * @description Default helper Controller Cass, contain all default informations that the controller use
 * @param {Array} fonction Array that contain the user datas send for the views and other
 * @param {Array} parameter Array that contain the server parameter
 */
class Controller {

  /**
   * @param Any
   * @type {Array<Any>}
   */
  fonction

  /**
   * @typedef {Object} Parameter
   * @property {Boolean} useRedirect : Use or not a redirection
   * @property {String} urlRedirect : The url where the redirection need to be
   * @property {Boolean} persistence : Keep the controller datas
   */
  parameter

  /**
   * @typedef {Object} Datas
   * @property {Any}
   */
  datas

  /**
   * @param {Array} fonction A Array with all the variable send by the user for the view to process it
   * @param {{}} parameter Router parameter editable by the user
   * @param {{}} datas The user controller datas {name: datas}
   */
    constructor(fonction = [], parameter = {}, datas = {}) {
      this.fonction = fonction
      this.parameter = parameter
      this.datas = datas
    }

    get fonction ()
    {
      return this.fonction
    }

    set fonction (fonction)
    {
      return this.fonction = fonction
    }

    get parameter ()
    {
      return this.parameter
    }

    set parameter (parameter)
    {
      return this.parameter = parameter
    }

    get datas ()
    {
      return this.datas
    }

    set datas (datas)
    {
      return this.datas = datas
    }
  }

exports.Controller = Controller