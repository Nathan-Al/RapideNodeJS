const beautyLogs = require('./helper/beautyLogs.js/main.js');

/**
 * 
 * @param {*} request Requetes serveur automatiquement envoyer pour traitement
 * @param {*} response Reponse serveur automatiquement envoyer pour traitement
 * @param {String} vue Vue envoyer par le router. R pour Request Views
 * @param {String} controller Controller envoyer par le router. R pour Request Controller
 * @param {String} name_page The page name given by the user
 * @param {String} pathname The url asked by the navigator
 * @param {String} erreur The error message
 */

async function gestionnaireRequetes(request, response, vue = null, controller = null, name_page = null, pathname = null, erreur = null) {

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
        let controllerMain = require("./processing/controller.js");
        let ControllerDatas = controllerMain.Controller({data:datas, controllerName:controller})
        response.render(viewsDir + vue + ".ejs", { Controller: ControllerDatas, PageTitle: name_page });
        response.end();
        beautyLogs.bLine(true)
        /**
         * Gestion des requets : POST ou GET envoyer
         */

        //ControllerDatas = await controllerMain.Controller(datas);

        if (datas.Post != undefined)
            console.log('Gestionnaire de Requête -DATA POST- :', ControllerDatas);
        else if (datas.Get != undefined)
            console.log('Gestionnaire de Requête -DATA GET- :', ControllerDatas);
        else if (datas.Get != undefined && datas.Post != undefined)
            console.log('Gestionnaire de Requête -DATA POST & GET :', ConControllerDatastroller);

        // After taken the Controller Datas and other create by the user 
        // everything need to be send to the views.
        // If the user asked for a redirections or not the choice mater here.
        if (ControllerDatas.use_redirect && ControllerDatas.url_Redirect != undefined) {
            console.log(`Gestionnaire de Requête -REDIRECT- :${typeof(ControllerDatas)}`);

            let targetUrl = (typeof(ControllerDatas.url_Redirect) != "undefined" ? ControllerDatas.url_Redirect : "/");

            if (!ControllerDatas.persistence) {
                ControllerDatas = undefined;
            }

            request.body = controller;
            response.redirect(targetUrl);
            response.end();
        } else if (ControllerDatas.use_redirect && ControllerDatas.url_Redirect == undefined || ControllerDatas.use_redirect == false && ControllerDatas.persistence) {
            console.log('Gestionnaire de Requête -RENDER DATA- :', ControllerDatas);
            beautyLogs.bLine()

            beautyLogs.bLine()
            console.log("Controller : ")
            response.render(viewsDir + vue + ".ejs", { Controller: ControllerDatas, PageTitle: name_page });
            controller = "";
            response.end();
            beautyLogs.bLine()
        }

    }
}


exports.gestionnaireRequetes = gestionnaireRequetes;
