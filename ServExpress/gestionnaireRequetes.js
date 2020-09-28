/**
 * 
 * @param {*} request Requetes serveur automatiquement envoyer pour traitement
 * @param {*} response Reponse serveur automatiquement envoyer pour traitement
 * @param {*} Rviews Vue envoyer par le router. R pour Request Views
 * @param {*} Rcontroller Controller envoyer par le router. R pour Request Controller
 * @param {*} data_get Informations envoyer par POST ou GET pour traitement par le controller
 * @param {*} nbreq Nombre d'appelle effectuer depuis la mise en router du serveur. Utiliser pour les logs
 */

async function gestionnaireRequetes(request, response, Rviews, Rcontroller, data_get, nbreq) {
    if(typeof(data_get)!="string")
    {
        console.log("Gestionnaire de Requête : views : " + Rviews + " nbreq:" + nbreq);
        console.log("    ");
        let vue = Rviews;
        let controlleur = Rcontroller;
        /**
         * Gestion des requets POST avec data envoyer
         */
        if (request._body) {
            let controllerReq = require("Controller/".controlleur);
            let Controller = await controllerReq.Controller(request.body);
    
            console.log("Gestionnaire de Requête ___-_DATA_-___ : controller : " + Controller);
            let targetUrl = (typeof(Controller.urlRedirect) != "undefined" ? Controller.urlRedirect : "../");
            console.log(Controller.fichier_cree)
            response.redirect(targetUrl);
            response.end();
        } 
        /**
        * Gestion des requets POST
        */
        else if (request._body == undefined || data_get != undefined) {
            let controllerReq = require("../Controller/" + controlleur + ".js");
            let Controller = await controllerReq.Controller(data_get);

            console.log("Gestionnaire de Requête ____-_RENDER_-____ : controller : " + Controller);

            response.render("../Views/" + vue + ".ejs", { Controller: Controller, PageTitle: vue });
            response.end();
        }
    }else
    {
        console.log("Hmmm c'est embêtant","Le serveur n'a pas la moindre idée de ce que vous vouliez, étrange non ?")
        response.render("../ServExpress/erreur/index.ejs", {Message : data_get});
        response.end();
    }

}
exports.gestionrequ = gestionnaireRequetes;