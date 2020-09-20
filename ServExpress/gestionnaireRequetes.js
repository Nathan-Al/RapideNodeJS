//let express = require('express');

async function gestionnaireRequetes(request, response, pathname, data_get, nbreq) {
    console.log("Gestionnaire de Requête : pathname : " + pathname + " nbreq:" + nbreq);
    console.log("    ");
    if (request._body) {
        let controller = require(pathname);
        let Controller = await controller.Controller(request.body);

        console.log("Gestionnaire de Requête ___-_DATA_-___ : controller : " + Controller);
        let targetUrl = (typeof(Controller.urlRedirect) != "undefined" ? Controller.urlRedirect : "../");
        console.log(Controller.fichier_cree)
        response.redirect(targetUrl);
        response.end();
    } else if (request._body == undefined || data_get != undefined) {
        let controller = require(pathname);
        let Controller = await controller.Controller(data_get);
        //let na = Controller.nom_site;
        console.log("Gestionnaire de Requête ___-_RENDER_-___ : controller : " + Controller);
        //console.log("Gestionnaire de Requête : controller : " + Controller.website_list[0]);
        //console.log("Gestionnaire de Requête : controller : " + na);
        response.render(Controller.Views, { Controller: Controller });
        response.end();
    }

}
exports.gestionrequ = gestionnaireRequetes;