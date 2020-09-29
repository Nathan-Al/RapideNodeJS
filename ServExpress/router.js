let gestreq = require("./gestionnaireRequetes");
let outils = require("./outil");
const fs = require('fs')

let urlValide = false;
let nomPage = [];
let urlPage = "";
let li;
let mo;
let data_get = undefined;

/**
 * 
 * @param {*} request Requetes serveur automatiquement envoyer pour traitement
 * @param {*} response Reponse serveur automatiquement envoyer pour traitement
 * @param {*} pathname Url envoyer par le navigateur au serveur
 * @param {*} nbreq Nombre d'appelle effectuer depuis la mise en router du serveur. Utiliser pour les logs
 */

async function router(request, response, pathname, nbreq) {
    let compteur = 0;
    console.log("Router request :" + request + " response : " + response + " pathname_slice : " + pathname + " nbreq : " + nbreq);

    let fichier = fs.readFileSync('ServExpress/lecteur_fichier.json');
    let json_parse = JSON.parse(fichier)
    let vue = false;
    let controller = false;
    let name_page = false;
    let pathname_slice = pathname;
    if (pathname.indexOf("?") != -1) {
        if (pathname.indexOf("?") != 1)
            pathname_slice = pathname_slice.slice(pathname_slice.indexOf("/"), pathname_slice.indexOf("?"));
    }
    if (pathname != "/" && pathname.indexOf("?") != 1) {
        pathname_slice = pathname_slice.slice(pathname_slice.lastIndexOf("/") + 1, pathname_slice.length);
    } else if (pathname != "/") {
        pathname_slice = pathname_slice.slice(pathname_slice.lastIndexOf("/"), pathname_slice.indexOf("?"));
        data_get = pathname.slice(pathname.indexOf("?") + 1, pathname.length).replace(/\+/g, " ");
    }

    while (vue == false || controller == false) {
        if (json_parse['route'].length == compteur) {
            break;
        }
        let tabs = json_parse['route'][compteur];
        for (i = 0; i < tabs['liens'].length; i++) {
            if (tabs['liens'][i] == pathname_slice) {
                let existeVue = await outils.NameSpace_LecteurFichiers.Fichier.VerifyFile('Views/' + tabs['Views'] + ".ejs");
                if (existeVue && typeof(existeVue) != 'object')
                    vue = true;
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
        console.log("Router : Normal circulation : " + pathname_slice);
        console.log("    ");

        gestreq.gestionrequ(request, response, vue, controller, name_page, data_get, nbreq++);
    }

    /* ROUTE URL NON VALIDE */
    else {
        let oops;
        if (controller == false && vue == true)
            oops = "Erreur : Impossible de trouver le controller";
        else if (vue == false && controller == true)
            oops = "Erreur : Impossible de trouver la vue";
        else if (controller == false && vue == false)
            oops = "Erreur : Impossible de trouver n'y le controller n'y la vue";
        gestreq.gestionrequ(request, response, "", "", oops, 0);
    }
}

exports.router = router;