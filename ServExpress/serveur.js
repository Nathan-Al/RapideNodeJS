const http = require('http');
const express = require('express');
let app = express();
var bodyParser = require('body-parser')
let routeur = require('./router.js');
let serveur_dis = require('./connexion');
const res = require('express/lib/response');

/**
 * 
 * @param {*} port Port a déffinir dans l'index
 */
function start(port) {
    let bdd_co = '';
    let bdd_response ='';
    let pathname = null;
    let req = '';
    let res = '';
    let nbreq = 0;

    bdd_co = serveur_dis.MySQLCo();
    app.use(function WaitOnRequest(request, response, next) {
        pathname = request.url;
        console.log("----------------------------------");
        console.log(`Serveur : nbreq-[${nbreq}], requetes-[${pathname}]`);

        app.set("Views")
        app.set('view engine', 'ejs')

        //Dossier de fichiers static
        app.use(express.static("Public"));
        app.use(bodyParser.urlencoded({ extended: true }));

        //Demmande en GET
        app.get("*", (request, response) => {
            req = request;
            res = response;
            console.log("----------------------------------");
            console.log(`Serveur GET : pathname-[${pathname}]`);
            console.log("----------------------------------\n");
            routeur.router(request, response, pathname, nbreq++);
        });
        //Demmande en POST
        app.post("*", (request, response) => {
            req = request;
            res = response;
            console.log("----------------------------------");
            console.log(`Serveur POST : pathname-[${pathname}]`);
            console.log("----------------------------------\n");
            routeur.router(request, response, pathname, nbreq++);
        });
        console.log("----------------------------------\n");

        //routeur.router(request, response, pathname, nbreq++);

        //Gestion redirection
        function handleRedirect(req, res) {
            const targetUrl = targetBaseUrl + req.originalUrl;
            res.redirect(targetUrl);
        }

        next();
    })

    switch (bdd_co) {
        case true:
            bdd_response = "Connected to the database !";
            break;
        case false:
            bdd_response = "Aucune base de données renseigné";
            break;
    }

    http.createServer(app).listen(port);
    console.log("----------------------------------");
    console.log("Serveur : Demarrage serveur port", port, 'url-[http://localhost:4444]');
    console.log("Version : 1.0.0");
    console.log("Database connection :", bdd_co);
    console.log("Vous pouvez arreter le serveur en faisant Ctrl + c")
    console.log("----------------------------------\n");
}

exports.start = start;