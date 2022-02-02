const beautyLogs = require('./module/BeautyLogs/main.js');
const handleError = require('./module/Error/handleError.js')

/**
 * 
 * @param {*} request Requetes serveur automatiquement envoyer pour traitement
 * @param {*} response Reponse serveur automatiquement envoyer pour traitement
 * @param {String} vue Vue envoyer par le router. R pour Request Views
 * @param {String} controller Controller envoyer par le router. R pour Request Controller
 * @param {String} pageName The page name given by the user
 * @param {String} pathname The url asked by the navigator
 * @param {String} erreur The error message
 */

async function gestionnaireRequetes(request, response, vue = null, controller = null, pageName = null, pathname = null, erreur = null) {

    let viewsDir = '../Views/'

    ///let Controller = null;
    /**
     * @param {Object}
     */
    let datas = {Get:undefined, Post:undefined};

    beautyLogs.bLine()
    console.log(`Gestionnaire de Requête : controller-[${controller}], views-[${vue}], pathname-[${pathname}], erreur-[${erreur}]`);

    if (controller != undefined && vue != undefined && typeof pathname === 'string' && erreur === 'none') {

        // Take the request from the url send in GET method
        if (pathname != "/" && pathname.indexOf("?") != -1)
            datas.Get = pathname.slice(pathname.indexOf("?") + 1, pathname.length).replace(/\+/g, " ");

        if (request._body)
            datas.Post = request.body;

        /**
         * Gestion des controller demander
         */
        console.log(`Gestionnaire de Requête -Call Controller-`);
        //let controllerMain = require(controllerDir + controller + ".js");
        let controllerMain = require("./controller.js");
        let controllerDatas = await controllerMain.Controller({data:datas, controllerName:controller})

        /**
         * Gestion des requets : POST ou GET envoyer
         */
        if (datas.Post != undefined)
            console.log('Gestionnaire de Requête -DATA POST- :', controllerDatas);
        else if (datas.Get != undefined)
            console.log('Gestionnaire de Requête -DATA GET- :', controllerDatas);
        else if (datas.Get != undefined && datas.Post != undefined)
            console.log('Gestionnaire de Requête -DATA POST & GET :', controllerDatas);

        // After taken the Controller Datas and other create by the user 
        // everything need to be send to the views.
        // If the user asked for a redirections or not the choice mater here.
        if (controllerDatas.use_redirect && controllerDatas.url_Redirect != undefined) {
            console.log(`Gestionnaire de Requête -REDIRECT- :${typeof(controllerDatas)}`);

            let targetUrl = (typeof(controllerDatas.url_Redirect) != "undefined" ? controllerDatas.url_Redirect : "/");

            if (!controllerDatas.persistence) {
                controllerDatas = undefined;
            }

            request.body = controller;
            response.redirect(targetUrl);
            response.end();
        } else if (controllerDatas.use_redirect && controllerDatas.url_Redirect == undefined || controllerDatas.use_redirect == false) {
            console.log('Gestionnaire de Requête -RENDER DATA- :', controllerDatas);
            beautyLogs.bLine()

            beautyLogs.bLine()
            console.log("Controller : ")
            response.render(viewsDir + vue + ".ejs", controllerDatas, {VR : controllerDatas, pageName });
            controller = "";
            response.end();
            beautyLogs.bLine()
        } else {
            response.render(viewsDir + vue + ".ejs", {VR : controllerDatas, pageName});
            response.end();
            beautyLogs.bLine(true)
        }

    } else {
        handleError.callError(error)
    }
}

exports.gestionnaireRequetes = gestionnaireRequetes;
