const http = require('http');
const favicon = require('serve-favicon');
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const beautyLogs = require('./module/BeautyLogs/main.js');
const routeur = require('./router.js');
const serveur_dis = require('./module/Database/connexion');

/**
 * @description Démarre le seveur NodeJS
 * @param {Number} port Port a déffinir dans l'index
 */
async function start(port) {
    let bddCon , pathname = undefined;
    let bddResponse = '';
    let nbreq = 0;

    bddCon = await serveur_dis.MySQLCo();
    app.use(function WaitOnRequest(requestMain, responseMain, next) {
        pathname = requestMain.url;

        console.log(`Serveur : nbreq-[${nbreq}], requetes-[${pathname}]`);

        app.set("Views")
        app.set('view engine', 'ejs')

        //Dossier de fichiers static
        app.use(express.static("Public"));
        app.use(favicon(__dirname + '/Media/favicon.ico'));
        app.use(bodyParser.urlencoded({ extended: true }));

        //Demmande en GET
        app.get("*", (request, response) => {
            console.log(`Serveur : GET pathname-[${pathname}]`,true);
            beautyLogs.bLine(true)
            routeur.router(request, response, pathname, nbreq++);
        });
        //Demmande en POST
        app.post("*", (request, response) => {
            console.log(`Serveur : POST pathname-[${pathname}]`);
            beautyLogs.bLine(true)
            routeur.router(request, response, pathname, nbreq++);
        });

        //Gestion redirection
        function handleRedirect(req, res) {
            const targetUrl = targetBaseUrl + req.originalUrl;
            res.redirect(targetUrl);
        }

        next();
    })

    switch (bddCon) {
        case true:
            bddResponse = "Connected to the database !";
            break;
        default:
            bddResponse = "Unable to connect to the database";
            break;
    }

    http.createServer(app).listen(port);
    beautyLogs.bLogs(
        'Serveur : Demarrage serveur port '+ port +' url-[http://localhost:4444]\n'+
        'Version : 1.0.0\n'+
        'Database connection : '+ bddResponse + '\n'+
        'You can stop the server by taping Ctrl + c')
}

exports.start = start;
