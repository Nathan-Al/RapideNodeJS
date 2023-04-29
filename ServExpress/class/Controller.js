const Info = require("../module/ServerInfo/class/ServerInfo")

/**
 * @description Default helper Controller Cass, contain all default informations that the controller use
 * @param {Array} fonction Array that contain the user datas send for the views and other
 * @param {Array} parameter Array that contain the server parameter
 */
class Controller {

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
   * @param {{}} parameter Router parameter editable by the user
   * @param {{}} datas All the variable send by the user for the view to process it datas {name: datas}
   */
    constructor(parameter = {}, datas = {}) {
      this.parameter = parameter
      this.datas = datas
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