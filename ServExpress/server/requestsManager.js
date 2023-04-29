//TODO use the logs middle
const beautyLogs = require('../module/BeautyLogs/main.js');
const errorHandler = require('../module/Error/main.js')
const rendering = require('./rendering');

/**
 * The request manager, every request made by the server pass by that controler
 * 
 * @param {*} request Requetes serveur automatiquement envoyer pour traitement
 * @param {*} response Reponse serveur automatiquement envoyer pour traitement
 * @param {String} vue Vue envoyer par le router. R pour Request Views
 * @param {String} controller Controller envoyer par le router. R pour Request Controller
 * @param {String} pageName The page name given by the user
 * @param {String} pathname The url asked by the navigator
 * @param {String} errorMessage The error message that was send by the upper module
 */

 exports.requestManager = async function(request, response, vue = null, controller = null, pageName = null, pathname = null, errorMessage = null) {
    console.log(`Request Manager : controller-[${controller}], views-[${vue}], page name-[${pageName}], pathname-[${pathname}], errorMessage-[${errorMessage}]`)
    let viewsDir = '../Views/'
    let datas = {Get:undefined, Post:undefined, PageName:pageName}

    if (controller != undefined && vue != undefined && typeof pathname === 'string' && errorMessage === 'none') {

        // Take the request from the url send in GET method
        if (pathname != "/" && pathname.indexOf("?") != -1) {
            datas.Get = pathname.slice(pathname.indexOf("?") + 1, pathname.length).replace(/\+/g, " ");
        }
        if (request._body) {
            datas.Post = request.body
        }

        /**
         * Gestion des controller demander / Controler wanted handle
         */
        console.log(`Request Manager : Call Controller-${pageName}`)
        let controllerMain = require("./controller.js");
        let controllerDatas = await controllerMain.Controller({data:datas, controllerName:controller})

        /**
         * Gestion des requets : POST ou GET envoyer
         */
        if (datas.Post != undefined)
            console.log('Request Manager -DATA POST- :', controllerDatas)
        else if (datas.Get != undefined)
            console.log('Request Manager -DATA GET- :', controllerDatas)
        else if (datas.Get != undefined && datas.Post != undefined)
            console.log('Request Manager -DATA POST & GET :', controllerDatas)

        // After taken the Controller Datas create by the user
        // everything need to be send to the views.
        // If the user asked for a redirections or not the choice mater here.
        if (controllerDatas.parameter.useRedirect && controllerDatas.parameter.urlRedirect != undefined) {
            console.log(`Request Manager -REDIRECT- :${typeof(controllerDatas)}`);

            let targetUrl = (typeof(controllerDatas.parameter.urlRedirect) != 'undefined' ? controllerDatas.parameter.urlRedirect : '/');

            if (!controllerDatas.parameter.persistence) {
                controllerDatas = undefined;
            }

            request.body = controller;
            response.redirect(targetUrl);
            response.end();
        } else if (pathname == '/ajax-request') {
            response.end(JSON.stringify(controllerDatas.datas))
            beautyLogs.bLine()
        } else if (controllerDatas.use_redirect && controllerDatas.url_Redirect == undefined || controllerDatas.use_redirect == false) {
            console.log('Request Manager : Render Data')
            console.log('Request Manager : Render page-', pageName)
            rendering.rendering(response)
            response.render(viewsDir + vue, controllerDatas, {CR : controllerDatas, pageName})
            response.end();
        } else {
            rendering.rendering(response, viewsDir + vue, {CR : controllerDatas.datas, pageName})
            beautyLogs.bLine()
        }

    } else {
        errorHandler.main(response, 'Internal Error', 'The ressource that you request doesn\'t exist or is not accessible', 404)
    }
}
