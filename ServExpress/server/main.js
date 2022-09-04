const http = require('http');
const favicon = require('serve-favicon');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// ----------------------------
const beautyLogs = require('../module/BeautyLogs/main');
const routeur = require('./router.js');
const serverInfo = require('../module/ServerInfo/main.js');
const infos = serverInfo.Main('infos');
const errorHandler = require('../module/Error/main.js')
const database = require('../service/database/main');
// ----------------------------
let pathname = undefined;
let nbreq = 0;

/**
 * @description Main function to charge all the module and service before startig the server
 * @param {Object} meta All the informations who exist in the meta JSON file
 * @param {Object} meta.server Server meta datas
 * @param {Object} meta.database Database meta datas
 */
async function Main(meta) {
    //const devMod = meta.server.devmode
    const port = meta.server.port
    const options = {
        dotfiles: 'ignore',
        etag: false,
        extensions: ['css', 'png', 'jpg', 'mp4', 'mp3', 'js', 'mjs'],
        index: false,
        maxAge: '1d',
        redirect: false,
        setHeaders: function (res, path, stat) {
          res.set('x-timestamp', Date.now());
        }
      }

    //todo plug the log service to server cmd log
    app.use(bodyParser.urlencoded({ extended: true }));

    //Dir static files
    app.use(express.static(meta.media.staticDir, options));
    app.use(express.static('./Views'));
    app.use(favicon(meta.media.icon));

    app.use(function WaitOnRequest(requestMain, responseMain, next) {
        console.log(`Server : nbreq-[${nbreq}], request-[${pathname}]`);
        pathname = requestMain.url;

        //todo handle the redirection from the server
        // function handleRedirect(req, res) {
        //     const targetUrl = targetBaseUrl + req.originalUrl;
        //     res.redirect(targetUrl);
        // }

        next();
    })

    app.set('views', 'Views')
    app.set('view engine', 'ejs')

    try {
        start(port, meta)
    } catch (error) {
        console.log('Unable to start the server : '+error)
    }

    //Handle Error
    // partie manquante les erreur 404
    app.use((req, res, next) => {
      next(require('http-errors')(404));
    })
    app.use((error, req, res, next) => {
        errorHandler.main(res, 'General Error', error, 500)
    })

}

exports.Main = Main;

/**
 * @description Start the NodeJS server
 * @param {Number} port The port using by the server
 */
async function start(port, meta) {

    const bddResponse = await database.verifyConnection()? 'Ok':'Error'
    //TODO use a better way for routing the web page
    app.all("*", (request, response) => {
        console.log(`Server : pathname-[${pathname}]`,true)
        routeur.router(request, response, pathname, nbreq++)
    });

    beautyLogs.bLogs
        (
            `${infos.name.toUpperCase()}
            Server : Demarrage Server port ${port} url-[http://localhost:${port}]
            Version : ${infos.version}
            Database connection status : ${bddResponse}
            You can stop the server by taping Ctrl + c`
        )
    //Create the http server
    http.createServer(app).listen(port);
}
