const beautyLogs = require("../module/BeautyLogs/main");
const { Controller } = require("../class/Controller");
/**
 * Controller Example
 * 
 * @param {Object} RequestesObject 
 * @param {Object} RequestesObject.data All the informations send in GET and POST {Get,Post}
 * @param {String} RequestesObject.data.Get The datas send in GET
 * @param {String} RequestesObject.data.POST The datas send in POST
 * @param {String} RequestesObject.data.PageName The site page name
 * 
 * @param {String} RequestesObject.controllerName The controller name
 * @param {String} database_info.user The user name used for the database connection
 * @param {String} database_info.password The password for user database
 */
exports.Controller = async function (RequestesObject) {

    let controllerDir = '../../Controller/';

    /**
     * @type {Controller} Class
     * @description Object who contain the informations send by user controller
     */
    let controller = new Controller();

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

    let controllerRequest = require(controllerDir + RequestesObject.controllerName);
    controller = await controllerRequest.Controller(RequestesObject.data, controller);

    return controller;
}
