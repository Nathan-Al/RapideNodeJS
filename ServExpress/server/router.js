const fs = require('fs');
const gestreq = require("./requestsManager");
const filesGestion = require("../module/Tools/files");
// const beautyLogs = require('../module/BeautyLogs/main.js');
 const handleError = require('../module/Error/main.js');

/**
 * 
 * @param {*} request Requetes serveur automatiquement envoyer pour traitement
 * @param {*} response Reponse serveur automatiquement envoyer pour traitement
 * @param {String} pathname Url envoyer par le navigateur au serveur
 * @param {Number} nbreq Nombre d'appelle effectuer depuis la mise en router du serveur. Utiliser pour les logs
 */

 exports.router = async function(request, response, pathname, nbreq) {
    console.log(`Router : request-[${typeof(request)}], response-[${typeof(response)}], pathnameSlice-[${pathname}]`)

    let compteur = 0
    /**
     * @descritpion Get all the url who exist in the JSON file
     */
    let urlsArray =  JSON.parse(fs.readFileSync('ServExpress/urls.json'))
    let vue = ''
    let controller = ''
    let pathnameSlice = ''
    let vueExist = false
    let controllerExist = false
    let namePage = false

    // Nettoyage du pathname des élément envoyer en method GET
    if (pathname.indexOf("?") != -1 && pathname.indexOf("?") != 1) {
        pathnameSlice = pathname.slice(pathname.indexOf("/"), pathname.indexOf("?"))
    }
    if (pathname != "/" && pathname.indexOf("?") != 1) {
        pathnameSlice = pathname.slice(pathname.lastIndexOf("/") + 1, pathname.length)
    } else if (pathname != "/") {
        pathnameSlice = pathname.slice(pathname.lastIndexOf("/"), pathname.indexOf("?"))
    }

    /**
     * Search in the JSON url
     */
    while (vueExist === false || controllerExist === false) {
        let urlsInfos = urlsArray['route']['user'][compteur]
        // Stop the while if 'compteur' is the same as the 'urls' array size
        if (urlsArray['route']['user'].length == compteur) {
            break;
        }

        for (const i in urlsInfos['liens']) {
            //Only choose ejs files for the view
            //TODO foud a better way to handle the views and controller choice
            if (urlsInfos['liens'][i] == pathnameSlice) {
                vueExist = await filesGestion.LecteurFichiers.Fichier.VerifyFile('Views/' + urlsInfos['views']);
                controllerExist = await filesGestion.LecteurFichiers.Fichier.VerifyFile('Controller/' + urlsInfos['controller']);
                break;
            }
        }

        if (controllerExist && vueExist) {
            vue = vueExist === true? urlsInfos['views']: vueExist
            controller = controllerExist === true? urlsInfos['controller']: controllerExist
            namePage = urlsInfos['name']
            break;
        }
        compteur++;
    }

    // ROUTE URL VALIDE / VALID URL
    if (pathnameSlice != "/favicon.ico" && controller != false && vue != false && vue != '' && controller != '') {
        gestreq.requestManager(request, response, vue, controller, namePage, pathname, 'none')
    } else {
        // ROUTE URL NON VALIDE / INVALID ROUTE OR URL
        let errorMessage = '';
        if (controller === false && vue === true || controller === '')
            errorMessage = "Impossible de trouver le controller / Unable to find the controler"
        else if (controller === true && vue === false || vue === '')
            errorMessage = "Impossible de trouver la vue / Unable to find the view";
        else if (controller === false && vue === false || vue === '' && controller === '')
            errorMessage = "Impossible de trouver n'y le controller n'y la vue / Unable to find the controler and the view";

        gestreq.requestManager
            (
                request,
                response,
                urlsArray['route']['internal'][0]['views'],
                urlsArray['route']['internal'][0]['controller'],
                urlsArray['route']['internal'][0]['name'],
                pathname,
                errorMessage
            )

    }
}
