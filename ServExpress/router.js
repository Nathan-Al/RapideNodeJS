let gestreq = require("./gestionnaireRequetes");
//var lli = require('../../Outil/lecteur-liens.js');
let public = "../Public";
let vue = "../Views";

let urlValide = false;
let nomPage = [];
let urlPage = "";
let li;
let mo;
let data_get = undefined;

function router(request, response, pathname, nbreq) {
    console.log("Router request :" + request + " response : " + response + " pathname : " + pathname + " nbreq : " + nbreq);

    lli.array_controller.forEach(function(element, indice) {
        li = element.lastIndexOf("/");
        mo = pathname.lastIndexOf(".");
        zi = pathname.lastIndexOf("/");
        t = pathname.lastIndexOf("?");
        subZi = pathname.substring(1);

        if (pathname.lastIndexOf("?") != -1) {
            data_get = pathname.slice(pathname.lastIndexOf("?") + 1, pathname.length);
            pathname = pathname.slice(0, pathname.lastIndexOf("?"));
            subZi = subZi.slice(0, subZi.lastIndexOf("?"));
        }

        if (subZi.lastIndexOf(".") == -1 || subZi.lastIndexOf(".") < 0)
            subZi = subZi + ".js";

        nomPage[indice] = element.substring(li + 1);
        pathnameSans = pathname.substring(zi + 1);
        //console.log("Router : nomPage : " + nomPage[indice] + " zi : " + pathnameSans + " Subzi : " + subZi);
        if (subZi == nomPage[indice]) {
            urlValide = true;
            urlPage = nomPage[indice];
            console.log("Router :    URL PAGE : " + urlPage);
        }
    });

    /* ROUTE URL VALIDE */
    if (urlValide === true && pathname != "/" && pathname != "/menu" && pathname != "/favicon.ico") {
        console.log("Router : Normal circulation : " + pathname);
        console.log("    ");

        gestreq.gestionrequ(request, response, "../" + lli.array_racine[1] + urlPage, data_get, nbreq++);
    } 
    /* ROUTE URL MENU */
    else if (pathname == "/" || pathname == "/style-menu.css" || pathname == "/default.png" || pathname == "/menu" && pathname != "/favicon.ico" && pathname == "") {
        console.log("Router : Envoie Menu");
        if (mo = ".css")
            console.log("Router : Css " + mo);
        console.log("Router : Pathname " + pathname);
        //require("../../Controller/controll-menu");
        gestreq.gestionrequ(request, response, "../../Controller/controll-menu", nbreq++);
    } 
    /* ROUTE URL NON VALIDE */
    else /*if (urlValide = false || pathname == "/favicon.ico") */ {
        
        gestreq.gestionrequ(request, response, "../../Controller/controll-404", 0);
        /*
        response.setHeader('Content-Type', 'text/html');
        response.status(404).send('Error 404 Page introuvable !');
        response.end();*/
        //throw new Error('Error 404 ' + pathname + ' introuvable !');
    }
}

exports.router = router;