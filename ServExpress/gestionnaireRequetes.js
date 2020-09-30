/**
 * 
 * @param {*} request Requetes serveur automatiquement envoyer pour traitement
 * @param {*} response Reponse serveur automatiquement envoyer pour traitement
 * @param {*} Rviews Vue envoyer par le router. R pour Request Views
 * @param {*} Rcontroller Controller envoyer par le router. R pour Request Controller
 * @param {*} data_get Informations envoyer par POST ou GET pour traitement par le controller
 * @param {*} nbreq Nombre d'appelle effectuer depuis la mise en router du serveur. Utiliser pour les logs
 */

async function gestionnaireRequetes(request, response, Rviews, Rcontroller, Rname_page, pathname, nbreq, erreur) {
    let data_get;
    let data_post;
    let datas;

    if (Rcontroller && Rviews && typeof pathname == "string" && erreur == undefined) {

        if (pathname != "/" && pathname.indexOf("?") != -1)
            data_get = pathname.slice(pathname.indexOf("?") + 1, pathname.length).replace(/\+/g, " ");
        else
            data_get = null;
        if (request._body)
            data_post = request.body;
        else
            data_post = null;

        datas = { data_get, data_post };

        console.log("Gestionnaire de Requête : views : ", Rviews, " nbreq:", nbreq);
        console.log("    ");
        let vue = Rviews;
        let controlleur = Rcontroller;
        let Controller;
        if (controlleur != "" || controlleur != undefined) {
            let controllerReq = require("../Controller/" + controlleur + ".js");

            /**
             * Gestion des requets sans data envoyer
             */
            if (data_post == null && data_get == null) {
                let controllerReq = require("../Controller/" + controlleur + ".js");
                let Controller = await controllerReq.Controller(datas);

                console.log("Gestionnaire de Requête ____-_RENDER_-____ : controller : ", Controller);

                response.render("../Views/" + vue + ".ejs", { Controller: Controller, PageTitle: Rname_page });
                response.end();
            }
            /**
             * Gestion des requets : POST ou GET envoyer
             */
            else {
                Controller = await controllerReq.Controller(datas);

                if (data_post != null)
                    console.log("Gestionnaire de Requête ___-_DATA_-___ : controller :", " POST", Controller);
                else if (data_get != null)
                    console.log("Gestionnaire de Requête ___-_DATA_-___ : controller :", " GET", Controller);
                else if (data_get != null && data_post != null)
                    console.log("Gestionnaire de Requête ___-_DATA_-___ : controller :", " POST & GET", Controller);

                redirection(Controller);
            }

            function redirection(controller) {
                if (controller.use_redirect && controller.url_Redirect != undefined) {
                    console.log("Gestionnaire de Requête ____-_REDIRECT_-____ : controller : " + controller);
                    let targetUrl = (typeof(controller.url_Redirect) != "undefined" ? controller.url_Redirect : "/");
                    if (!controller.persistence) {
                        controller = undefined;
                    }
                    /*response.writeHead(302, {
                        'Location': targetUrl,
                        'Controller': controller
                            //add other headers here...
                    });*/
                    //response.end();
                    request.body = controller;
                    response.redirect(targetUrl);
                    response.end();
                } else if (controller.use_redirect && controller.url_Redirect == undefined || controller.use_redirect == false && controller.persistence) {
                    console.log("Gestionnaire de Requête ____-_RENDER_-____ DATA SEND : controller : ", controller);
                    response.render("../Views/" + vue + ".ejs", { Controller: controller, PageTitle: Rname_page });
                    controller = "";
                    response.end();
                }
            }
        }
    } else {
        console.log("Hmmm c'est embêtant", "Le serveur n'a pas la moindre idée de ce que vous vouliez, étrange non ?")
        response.render("../ServExpress/erreur/index.ejs", { Message: data_get });
        response.end();
    }

}
exports.gestionrequ = gestionnaireRequetes;