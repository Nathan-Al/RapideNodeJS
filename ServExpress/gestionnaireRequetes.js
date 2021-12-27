/**
 * 
 * @param {*} request Requetes serveur automatiquement envoyer pour traitement
 * @param {*} response Reponse serveur automatiquement envoyer pour traitement
 * @param {*} vue Vue envoyer par le router. R pour Request Views
 * @param {*} controller Controller envoyer par le router. R pour Request Controller
 * @param {*} data_get Informations envoyer par POST ou GET pour traitement par le controller
 * @param {*} nbreq Nombre d'appelle effectuer depuis la mise en router du serveur. Utiliser pour les logs
 */

async function gestionnaireRequetes(request, response, vue = null, controller = null, name_page = null, pathname = null, nbreq = null, erreur = null) {

    console.log("----------------------------------");
    console.log(`Gestionnaire de Requête : controller-[${controller}], views-[${vue}], pathname-[${pathname}], erreur-[${erreur}]`);

    let data_get;
    let data_post;
    let datas;

    if (controller && vue && typeof pathname === 'string' && erreur === 'none') {

        if (pathname != "/" && pathname.indexOf("?") != -1)
            data_get = pathname.slice(pathname.indexOf("?") + 1, pathname.length).replace(/\+/g, " ");
        else
            data_get = null;
        if (request._body)
            data_post = request.body;
        else
            data_post = null;
        //Données get et post traiter
        datas = { data_get, data_post };

        let Controller = null;
        if (controller != "" || controller != undefined) {
            let controllerReq = require("../Controller/" + controller + ".js");

            /**
             * Gestion des requets sans data envoyer
             */
            if (data_post == null && data_get == null) {
                let controllerReq = require("../Controller/" + controller + ".js");
                let Controller = await controllerReq.Controller(datas);

                console.log(`Gestionnaire de Requête -RENDER DATA- :`, Controller);
                console.log("----------------------------------\n");

                console.log("----------------------------------");
                console.log("Controller")
                response.render("../Views/" + vue + ".ejs", { Controller: Controller, PageTitle: name_page });
                response.end();
                console.log("----------------------------------\n");
            }
            /**
             * Gestion des requets : POST ou GET envoyer
             */
            else {
                Controller = await controllerReq.Controller(datas);

                if (data_post != null)
                    console.log('Gestionnaire de Requête -DATA POST- :', Controller);
                else if (data_get != null)
                    console.log('Gestionnaire de Requête -DATA GET- :', Controller);
                else if (data_get != null && data_post != null)
                    console.log('Gestionnaire de Requête -DATA POST & GET :', Controller);

                redirection(Controller);
            }

            function redirection(controller) {
                if (controller.use_redirect && controller.url_Redirect != undefined) {
                    console.log(`Gestionnaire de Requête -REDIRECT- :${typeof(controller)}`);
                    let targetUrl = (typeof(controller.url_Redirect) != "undefined" ? controller.url_Redirect : "/");
                    if (!controller.persistence) {
                        controller = undefined;
                    }
                    request.body = controller;
                    response.redirect(targetUrl);
                    response.end();
                } else if (controller.use_redirect && controller.url_Redirect == undefined || controller.use_redirect == false && controller.persistence) {
                    console.log('Gestionnaire de Requête -RENDER DATA- :', controller);
                    console.log("----------------------------------\n");

                    console.log("----------------------------------");
                    console.log("Controller : ")
                    response.render("../Views/" + vue + ".ejs", { Controller: controller, PageTitle: name_page });
                    controller = "";
                    response.end();
                    console.log("----------------------------------\n");
                }
            }
        }
    } else {
        console.log("\n!-----------------ERROR-----------------!");
        console.group();
        console.warn("Impossible de trouver la ressource demander.")
        console.log(`Informations : controller-[${controller}], vue-[${vue}], url-[${pathname}], error message-[${erreur}]`)
        console.log('Request :', request.params);
        console.log('Response :', response.params);
        console.groupEnd();
        console.log("!-----------------ERROR-----------------!\n");

        response.render("../ServExpress/erreur/index.ejs", { Message: data_get });
        response.end();
    }

}
exports.gestionnaireRequetes = gestionnaireRequetes;