let http = require('http');
let express = require('express');
let app = express();
var bodyParser = require('body-parser')
let routeur = require('./router.js');

let message = "Serveur : ";
let pathname
let nbreq = 0;

/**
 * 
 * @param {*} port Port a déffinir dans l'index
 */
function start(port) {
    app.use(function WaitOnRequest(req, res, next) {
        pathname = req.url;
        console.log("       ");
        console.log(message + "WaitOnRequest nbreq : " + nbreq + " requetes : " + pathname);

        app.set("Views")
        app.set('view engine', 'ejs')

        //Dossier de fichiers static
        app.use(express.static("Public"));
        app.use(bodyParser.urlencoded({ extended: true }));

        //Demmande en GET
        app.get("*", (request, response) => {
            console.log("       ");
            console.log("Serveur get : pathname : " + pathname + " nbreq:" + nbreq);
            routeur.router(request, response, pathname, nbreq++);
        });
        //Demmande en POST
        app.post("*", (request, response) => {
            console.log("       ");
            console.log("Serveur post : " + " nbreq:" + nbreq);
            routeur.router(request, response, pathname, nbreq++);
        });

        //Gestion redirection
        function handleRedirect(req, res) {
            const targetUrl = targetBaseUrl + req.originalUrl;
            res.redirect(targetUrl);
        }

        next();
    })

    http.createServer(app).listen(port);
    console.log("       ");
    console.log("Serveur : Demarrage serveur port " + port);
}

exports.start = start;