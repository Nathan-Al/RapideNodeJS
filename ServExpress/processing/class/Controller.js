/**
 * @description Default helper Controller Cass, contain all default informations that the controller use
 * @param {Array} fonction Array that contain the user datas send for the views and other
 * @param {Array} parameter Array that contain the server parameter
 */
class Controller {
  fonction = []
  /**
   * 
   * @param {Array} fonction 
   * @param {Array} parameter 
   */
    constructor(fonction, parameter) {
      this.fonction = fonction;
      this.parameter = parameter;
    }

    get fonction ()
    {
      return this.fonction
    }

    set fonction (fonction)
    {
      return this.fonction = fonction
    }
  }

exports.Controller = Controller