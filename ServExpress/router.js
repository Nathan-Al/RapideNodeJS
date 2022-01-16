const fs = require('fs')
const gestreq = require("./gestionnaireRequetes");
const outils = require("./outil");
const beautyLogs = require('./helper/beautyLogs.js/main.js');

let urlValide = false;

/**
 * 
 * @param {*} request Requetes serveur automatiquement envoyer pour traitement
 * @param {*} response Reponse serveur automatiquement envoyer pour traitement
 * @param {String} pathname Url envoyer par le navigateur au serveur
 * @param {Number} nbreq Nombre d'appelle effectuer depuis la mise en router du serveur. Utiliser pour les logs
 */

async function router(request, response, pathname, nbreq) {

    beautyLogs.bLine()
    console.log(`Router : request-[${typeof(request)}], response-[${typeof(response)}], pathname_slice-[${pathname}]`);

    let compteur = 0;
    /**
     * @descritpion Get all the url who exist in the JSON file
     */
    let urls_array =  JSON.parse(fs.readFileSync('ServExpress/urls.json'));

    let vue = false;
    let controller = false;
    let name_page = false;
    let pathname_slice = '';

    // Nettoyage du pathname des élément envoyer en method GET
    if (pathname.indexOf("?") != -1) {
        if (pathname.indexOf("?") != 1)
            pathname_slice = pathname.slice(pathname.indexOf("/"), pathname.indexOf("?"));
    }
    if (pathname != "/" && pathname.indexOf("?") != 1) {
        pathname_slice = pathname.slice(pathname.lastIndexOf("/") + 1, pathname.length);
    } else if (pathname != "/") {
        pathname_slice = pathname.slice(pathname.lastIndexOf("/"), pathname.indexOf("?"));
    }

    /**
     * Search in the JSON url
     */
    while (vue == false || controller == false) {
        // Stop l'execution de la boucle si
        if (urls_array['route'].length == compteur) {
            break;
        }

        let tabs = urls_array['route'][compteur];
        for (i = 0; i < tabs['liens'].length; i++) {
            if (tabs['liens'][i] == pathname_slice) {
                // Verifier l'existence de la vue
                let existeVue = await outils.NameSpace_LecteurFichiers.Fichier.VerifyFile('Views/' + tabs['Views'] + ".ejs");
                if (existeVue && typeof(existeVue) != 'object')
                    vue = true;
                // Verifier l'existence du controller
                let existeCont = await outils.NameSpace_LecteurFichiers.Fichier.VerifyFile('Controller/' + tabs['Controller'] + ".js");
                if (existeCont && typeof(existeCont) != 'object')
                    controller = true;
                break;
            }
        };
        if (controller) {
            if (vue) {
                vue = tabs['Views'];
                controller = tabs['Controller'];
                name_page = tabs['name'];
                urlValide = true;
                break;
            }
        }
        compteur++;
    }

    /* ROUTE URL VALIDE */
    if (urlValide == true && pathname_slice != "/favicon.ico" && controller != false && vue != false) {
        console.log(`Router : [${pathname_slice}]`);
        beautyLogs.bLine(true)
        gestreq.gestionnaireRequetes(request, response, vue, controller, name_page, pathname, 'none');
    } else {
        /* ROUTE URL NON VALIDE */
        let error = null;
        if (controller == false && vue == true)
            error = "Impossible de trouver le controller";
        else if (vue == false && controller == true)
            error = "Impossible de trouver la vue";
        else if (controller == false && vue == false)
            error = "Impossible de trouver n'y le controller n'y la vue";
            beautyLogs.bLine(true)
        callError(error)
    }

    async function callError(error)
    {
        // let controllerRequest = require("../ServExpress/erreur/handle_error.js");
        // let ControllerDatas = await controllerRequest.Controller();
        console.log("\n!----------------------------------!");
        console.group();
        console.warn("Impossible de trouver la ressource demander.")
        console.log(`Informations : controller-[${controller}], vue-[${vue}], url-[${pathname}], error message-[${error}]`)
        console.log('Request :', request.params);
        console.log('Response :', response.params);
        console.groupEnd();
        console.log("!----------------------------------!\n");

        response.render("../ServExpress/erreur/index.ejs", { Message: error});
        response.end();
    }

    exports.router.callError = callError;
}

exports.router = router;