/**
 * 
 * @param {*} request Requetes serveur automatiquement envoyer pour traitement
 * @param {*} response Reponse serveur automatiquement envoyer pour traitement
 * @param {*} Rviews Vue envoyer par le router. R pour Request Views
 * @param {*} Rcontroller Controller envoyer par le router. R pour Request Controller
 * @param {*} data_get Informations envoyer par POST ou GET pour traitement par le controller
 * @param {*} nbreq Nombre d'appelle effectuer depuis la mise en router du serveur. Utiliser pour les logs
 */

async function gestionnaireRequetes(request, response, Rviews, Rcontroller, Rname_page, data_get, nbreq) {
    if (Rcontroller && Rviews) {
        console.log("Gestionnaire de Requête : views : " + Rviews + " nbreq:" + nbreq);
        console.log("    ");
        let vue = Rviews;
        let controlleur = Rcontroller;
        let Controller;
        if (controlleur != "" || controlleur != undefined) {
            let controllerReq = require("../Controller/" + controlleur + ".js");
            /**
             * Gestion des requets : POST avec body envoyer sans GET envoyer data_get vide
             */
            if (request._body && data_get == undefined) {
                Controller = await controllerReq.Controller(request.body);
                console.log("Gestionnaire de Requête ___-_DATA_-___ : controller : " + Controller + " POST");
                redirection(Controller);
            }
            /**
             * Gestion des requets : POST sans body envoyer et GET envoyer data_get non vide
             */
            else if (!request._body && data_get != undefined) {
                Controller = await controllerReq.Controller(data_get);
                console.log("Gestionnaire de Requête ___-_DATA_-___ : controller : " + Controller + " GET");
                redirection(Controller);
            }
            /**
             * Gestion des requets : POST avec body envoyer et GET envoyer data_get non vide
             */
            else if (request._body && data_get != undefined) {
                let controllerReq = require("../Controller/" + controlleur + ".js");
                /**
                 * @param {*} Getdata_Postdata
                 */
                let datas = { "get": data_get, "post": request.body };
                Controller = await controllerReq.Controller(datas);

                console.log("Gestionnaire de Requête ___-_DATA_-___ : controller : " + Controller + " POST & GET");
                redirection(Controller);
            }

            /**
             * Gestion des requets POST sans data envoyer
             */
            else if (request._body == undefined || data_get == undefined) {
                data_get = "no_data"
                let controllerReq = require("../Controller/" + controlleur + ".js");
                let Controller = await controllerReq.Controller(data_get);

                console.log("Gestionnaire de Requête ____-_RENDER_-____ : controller : " + Controller);

                response.render("../Views/" + vue + ".ejs", { Controller: Controller, PageTitle: Rname_page });
                response.end();
            }

            function redirection(controller) {
                if (controller.use_redirect && controller.url_Redirect != undefined) {
                    console.log("Gestionnaire de Requête ____-_REDIRECT_-____ : controller : " + controller);
                    let targetUrl = (typeof(controller.url_Redirect) != "undefined" ? controller.url_Redirect : "/");
                    response.writeHead(302, {
                        'Location': targetUrl
                            //add other headers here...
                    });
                    response.end();
                    //response.redirect(targetUrl);
                    //response.end();
                } else if (controller.use_redirect && controller.url_Redirect == undefined || controller.use_redirect == false) {
                    console.log("Gestionnaire de Requête ____-_RENDER_-____ : controller : " + controller);
                    response.render("../Views/" + vue + ".ejs", { Controller: controller, PageTitle: Rname_page });
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