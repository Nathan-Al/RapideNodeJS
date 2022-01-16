const beautyLogs = require("../helper/beautyLogs.js/main");
const { Controller } = require("./class/controller");
/**
 * 
 * @param {Object} RequestesObject 
 * @param {Object} RequestesObject.data All the informations send in GET and POST {Get,Post}
 * @param {String} RequestesObject.data.Get The datas send in GET
 * @param {String} RequestesObject.data.POST The datas send in POST
 * 
 * @param {String} RequestesObject.controllerName The controller name
 * @param {String} database_info.user The user name used for the database connection
 * @param {String} database_info.password The password for user database
 */
exports.Controller = async function controller(RequestesObject) {

    let controller = new Controller();
    /**
     * @description A Array with all the variable send by the user for the view to process it
     */

    controller.fonction = fonctionController = [];
    /**
     * @param {boolean} use_redirect If the user want to redirect the page to another one
     * @param {string} urlRedirect The url the user choose to redirect the page
     * @param {boolean} persistence If the user want to keep the same controller
     */
    controller.parameter = {
        useRedirect:false,
        urlRedirect: '/',
        persistence:true,
    };

    let controllerDir = '../../Controller/';

    beautyLogs.bLine()
    //console.log("Controller", globalParameter, "fonctionController", await this)
    let controllerRequest = require(controllerDir + RequestesObject.controllerName + ".js");
    let ControllerDatas = await controllerRequest.Controller(controller);

    return ControllerDatas;
}