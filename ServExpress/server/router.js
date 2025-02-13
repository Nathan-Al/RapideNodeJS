const fs = require('fs');
const gestreq = require("./requestsManager");
const filesGestion = require("../../Tools/files");

/**
 * A manual way to find files and ressource ask by the user and the server.
 * This way of 'routing' page dosen't use Express or NodeJS inbuild routing function.
 * 
 * @param {*} request Requetes serveur automatiquement envoyer pour traitement
 * @param {*} response Reponse serveur automatiquement envoyer pour traitement
 * @param {String} pathname Url envoyer par le navigateur au serveur
 * @param {Number} nbreq Nombre d'appelle effectuer depuis la mise en router du serveur. Utiliser pour les logs
 */

 exports.router = async function(request, response, pathname, nbreq) {
    console.log(`Router : request-[${typeof(request)}], response-[${typeof(response)}], pathnameSlice-[${pathname}]`)

    /**
     * @descritpion Get all the url who exist in the JSON file
     */
    let jsonUrlsArray =  JSON.parse(fs.readFileSync('ServExpress/urls.json'))
    const urls = jsonUrlsArray['route']['user']
    let vue = ''
    let controller = ''
    let pathnameSlice = ''
    let vueExist = false
    let controllerExist = false
    let namePage = ''

    // Nettoyage du pathname des élément envoyer en method GET
    if (pathname.indexOf("?") != -1 && pathname.indexOf("?") != 1) {
        pathnameSlice = pathname.slice(pathname.indexOf("/"), pathname.indexOf("?")).replace('/','')
    } else if (pathname == '/ajax-request') {
        pathnameSlice = JSON.parse(request.body.data).controller
    } else if (pathname != "/" && pathname.indexOf("?") != 1) {
        pathnameSlice = pathname.slice(pathname.lastIndexOf("/") + 1, pathname.length)
    } else if (pathname != "/") {
        pathnameSlice = pathname.slice(pathname.lastIndexOf("/"), pathname.indexOf("?"))
    } else {
        pathnameSlice = pathname
    }

    /**
     * Search in the JSON url
     */
    for (const pageName in urls) {
        //Only choose ejs files for the view
        //TODO foud a better way to handle the views and controller verification
        if (urls[pageName]['link'].includes(pathnameSlice)) {
            namePage = pageName
            vueExist = await filesGestion.LecteurFichiers.Fichier.VerifyFile('Views/' + urls[pageName]['views']);
            controllerExist = await filesGestion.LecteurFichiers.Fichier.VerifyFile('Controller/' + urls[pageName]['controller']);
            break;
        }
    }

    if (controllerExist && vueExist) {
        vue = vueExist === true? urls[namePage]['views']: vueExist
        controller = controllerExist === true? urls[namePage]['controller']: controllerExist
    }

    // ROUTE URL VALIDE / VALID URL
    if (pathnameSlice != "/favicon.ico" && controller != false && vue != false && vue != '' && controller != '') {
        gestreq.requestManager(request, response, vue, controller, namePage, pathname, 'none')
    } else {
        // ROUTE URL NON VALIDE / INVALID ROUTE OR URL
        let errorMessage = '';
        if (controller === false && vue === true || controller === '')
            errorMessage = `Impossible de trouver le controller / Unable to find the controler for the url {${pathnameSlice} }`
        else if (controller === true && vue === false || vue === '')
            errorMessage = `Impossible de trouver la vue / Unable to find the view for the url { ${pathnameSlice} }`;
        else if (controller === false && vue === false || vue === '' && controller === '')
            errorMessage = `Impossible de trouver n'y le controller n'y la vue / Unable to find the controler and the view for the url { ${pathnameSlice} }`;

        gestreq.requestManager (
            request,
            response,
            jsonUrlsArray['route']['internal']['error']['views'],
            jsonUrlsArray['route']['internal']['error']['controller'],
            jsonUrlsArray['route']['internal']['error']['name'],
            pathname,
            errorMessage
        )
    }
}
