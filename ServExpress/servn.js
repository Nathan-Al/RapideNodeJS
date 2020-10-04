/**
 * COEUR DU PROGRAMME DE COMMANDE
 * VERSION 0.0.1
 * DATE DE CREATION 27/09/2020
 * LICENSE OPEN SOURCE
 * CONTACT nathan.maserakan@gmail.com
 */
const process = require('process');
const fs = require("fs")
const rl = require('readline').createInterface(process.stdin, process.stdout);
let tools = require("./outil.js");
let normarlisation = require("./normalisations.js");
let nettoyage = normarlisation.NameSpace_Normalisations.Chaine;
let runing = true;
let sous_menu = false;

function data_controller(nime = "") {
let contenue_controller =
"/* Fichier généré automatiquement Controller liée a la page : " + nime + " keep the name in mind so you can delte the page if you want */ \n" +
"                                                                  \n" +
"/* \n" +
"* @param {*} data Donnée envoyer en POST ou GET \n" +
"*/ \n" +
"exports.Controller = async function Controller(data) { \n" +
"/* \n" +
"* @description Tableaux Principal de la fonction \n" +
"*/ \n" +
"var fonctionController = []; \n" +
"                                                                  \n" +
"if (data.data_get == null && data.data_post == null) { \n" +
"/* \n" +
"* ---------------------------------------------------- \n" +
"* @description Use that part to send data to the views \n" +
"* ---------------------------------------------------- \n" +
"*/ \n" +
"                                                                       \n" +
"///Tape your code here \n" +
"                                                                       \n" +
"return fonctionController; \n" +
"} else if (data != undefined && data != 'no_data') { \n" +
"/* \n" +
"* ------------------------------------------ \n" +
"* @description Use that part to process data \n" +
"* ------------------------------------------ \n" +
"*/ \n" +
"/* \n" +
"* @argument boolean The use_redirect variable is mean to redirect to a different selected page \n" +
"*/ \n" +
"fonctionController.use_redirect = false; \n" +
"/* \n" +
" * @descriptionThe url_redirect variable is mean to choose the page, give it he name of the controller you want to redirect to. If you let it undefined the same page will be render \n" +
" */ \n" +
"fonctionController.url_Redirect = '/'; \n" +
"/* \n" +
"* @description Use that part if datas is send in POST and GET \n" +
"* ! In version 0.0.1 the persistence setting don't work ! \n" +
"*/ \n" +
"fonctionController.persistence = false; \n" +
"                                                                                                          \n" +
"/* \n" +
"* @description Use that part if you want to use POST or GET datas \n" +
"*/ \n" +
"if (data) { \n" +
"   let info_get; \n" +
"   let info_post; \n" +
"                                  \n" +
"if (data.data_post != null) { \n" +
"    //Tap your code here                                 \n" +
"   } else if (data.data_get != null) { \n" +
"     //Tap your code here                                 \n" +
"   } \n" +
"   } else { \n" +
"       return new Error('Controller error : aucune informations envoyer'); \n" +
"   }                                                                     \n" +
"                                                                                         \n" +
"return fonctionController; \n" +
"   } else { \n" +
"       return new Error('Controller error : Aucune informations n\\'a été envoyer'); \n" +
"   } \n" +
"};"
    return contenue_controller;
};

function data_vue(nime = "") {
    let contenue_vue = "<!-- Fichier généré automatiquement Vue : --> \n" +
        "<!DOCTYPE html> \n" +
        "<html lang='en'> \n" +
        "<head> \n" +
        "   <meta charset='UTF-8'> \n" +
        '    <meta name="viewport" content="width=device-width, initial-scale=1.0"> \n' +
        '    <link type="text/css" rel="stylesheet" href="Css\\' + nime + '.css"> \n' +
        "    <title> \n" +
        "        <%= PageTitle %> \n" +
        "    </title> \n" +
        "</head> \n" +
        "<body> \n" +
        "    <h1>Bienvenue sur la page \n" +
        "        <%= PageTitle %> \n" +
        "    </h1> \n" +
        "    <div class='conteneur'> \n" +
        "        <h1>CORP</h1> \n" +
        "    </div> \n" +
        "</body> \n" +
        "</html> \n"

    return contenue_vue;
};

let data_css = "body \n" +
    "{\n" +
    "    width: 100%; \n" +
    "    height: 100%; \n" +
    "margin: 0%; \n" +
    "padding: 0%; \n" +
    "    background-color: rgb(184, 184, 184); \n" +
    "} \n" +
    "\n" +
    ".conteneur\n" +
    "{" +
    "    background-color: aquamarine; \n" +
    "    width: 100%; \n" +
    "    height: auto; \n" +
    "margin: 0%; \n" +
    "padding: 0%; \n" +
    "}";

var cliConfig = {
    promptPrefix: 'Menu > '
}

console.log('Hello and welcome to the command prompt ! You can type your command : ');
rl.on('line', (reponse) => {
    if (reponse == "New Page" || reponse == "np") {
        rl.pause();
        NewPage();
    } else if (reponse == "supp" || reponse == "Suppress") {
        rl.pause();
        SuppPage();
    } else if (reponse == "help" || reponse == "h") {
        rl.pause();
        help();
    } else if (reponse == "exit" || reponse == "Exit") {
        runing = false;
    } else {
        if (sous_menu == false)
            console.log("! Command not found !")
    }

    if (runing)
        rl.prompt();
    else
        rl.close();
});

function help() {
    console.log("ALPHA");
    console.log("- %cNew Page or %cnp give you the possibility to create a new Page \n- %cSuppress or %csupp give you the possibility to delete a page \n- %cExit or %cexit close the command prompt", 'color:blue;', 'color:blue;', 'color:blue;', 'color:blue;', 'color:blue;', 'color:blue;');
    return true;
}

async function NewPage() {
    sous_menu = true;
    rl.setPrompt("New Page -: ");

    console.log('Do you want to have different name for the page name,view,controller,css,url ? yes/no ? : (no) ');
    await rl.on('line', async(raw_diff) => {
        diff = nettoyage.NettoyageCharactere_1(raw_diff)
        if (diff == "yes") {
            let nom_page;
            let nom_views
            let nom_controller;
            let nom_css;
            let nom_liens = [];
            let veri_page = false;
            let veri_views = false;
            let veri_controller = false;
            let veri_css = false;
            let veri_liens = false;

            /**
             * Gestion PAGE
             */
            if (veri_page == false)
                rl.question('What do you want to name the page ? : ', (raw_name_ppa) => {
                    name_ppa = nettoyage.NettoyageCharactere_1(raw_name_ppa);
                    nom_page = name_ppa;
                    veri_page == true;

                    if (veri_controller == false)
                        rl.question('Give the controller name : ', (raw_name_ct) => {
                            name_ct = nettoyage.NettoyageCharactere_1(raw_name_ct)
                            nom_controller = name_ct;
                            veri_controller = true;

                            if (veri_views == false)
                                rl.question('Give the view name : ', (raw_name_vus) => {
                                    name_vus = nettoyage.NettoyageCharactere_1(raw_name_vue)
                                    nom_views = name_vus;
                                    veri_views = true;

                                    if (veri_css == false)
                                        rl.question('Give the css name : ', (raw_name_css) => {
                                            name_css = nettoyage.NettoyageCharactere_1(raw_name_css);
                                            nom_css = name_css;
                                            veri_css = true;

                                            /**
                                             * Gestion URL
                                             */
                                            rl.question("Do you want to have multiple url ? (yes/no) : (no) ", (url_ques) => {
                                                if (url_ques = "yes" && url_ques != "" && url_ques != "no") {
                                                    rl.question("Give the urls name : ", (raw_name_lli) => {
                                                        name_lli = nettoyage.NettoyageCharactere_1(raw_name_lli)
                                                        nom_liens = name_lli.split(" ");
                                                        veri_liens = true;
                                                        console.log("Summarize actions : Page name = " + nom_page, "view name = " + nom_views, "controller name = " + nom_controller, "css name = " + nom_css, "url(s) name = " + nom_liens);
                                                        rl.question("All good ? (oui/no) : (yes) ", (final) => {
                                                            if (final == "yes" || final == "") {
                                                                tools.NameSpace_LecteurFichiers.Fichier.creer("Controller", nom_controller, "js", data_controller(nom_page));
                                                                tools.NameSpace_LecteurFichiers.Fichier.creer("Views", nom_views, "ejs", data_vue(nom_views));
                                                                tools.NameSpace_LecteurFichiers.Fichier.creer("Public\\Css", nom_css, "css", data_css);
                                                                Edit_Json_New_Page(nom_page, nom_views, nom_controller, nom_liens, nom_css);
                                                                rl.close();
                                                            } else {
                                                                console.log("Mission abort")
                                                                rl.close();
                                                            }
                                                        });
                                                    });
                                                } else if (url_ques == "" || url_ques == "no") {
                                                    rl.question("Give the url name : ", (raw_url_resp) => {
                                                        url_resp = nettoyage.NettoyageCharactere_1(raw_url_resp);
                                                        nom_liens = url_resp;
                                                        veri_liens = true;
                                                        console.log("Summarize actions : Page name = " + nom_page, "| view name = " + nom_views, "| controller name = " + nom_controller, "| url(s) name = " + nom_liens);
                                                        rl.question("All good ? (yes/no) : (yes) ", (final) => {
                                                            if (final == "yes" || final == "") {
                                                                tools.NameSpace_LecteurFichiers.Fichier.creer("Controller", nom_controller, "js", data_controller(nom_controller));
                                                                tools.NameSpace_LecteurFichiers.Fichier.creer("Views", nom_views, "ejs", data_vue(nom_views));
                                                                tools.NameSpace_LecteurFichiers.Fichier.creer("Public\\Css", nom_css, "css", data_css);
                                                                Edit_Json_New_Page(nom_page, nom_views, nom_controller, nom_liens, nom_css);
                                                                rl.close();
                                                            } else {
                                                                console.log("Mission abort")
                                                                rl.close();
                                                            }
                                                        });
                                                    });
                                                };
                                            });
                                        });
                                });
                        });
                });

        } else if (diff == "" || diff == "no") {
            console.log('Give the page name : ');
            rl.on('line', async(name) => {

                console.log("Summarize actions : Page name = " + name, "| views name = " + name, "| controller name = " + name, "| url name = " + name);
                rl.question("Tout est bon ? (oui/no) : (yes) ", async(final) => {
                    if (final == "yes" || final == "") {
                        await tools.NameSpace_LecteurFichiers.Fichier.creer("Controller", name, "js", data_controller(name));
                        await tools.NameSpace_LecteurFichiers.Fichier.creer("Views", name, "ejs", data_vue(name));
                        await tools.NameSpace_LecteurFichiers.Fichier.creer("Public/Css", name, "css", data_css);
                        Edit_Json_New_Page(name, name, name, name, name)
                        rl.close();
                    } else {
                        console.log("Mission abort")
                        rl.close();
                    }
                });
            });
        }
    });
}

async function SuppPage()
{
    sous_menu = true;
    let nomCont;
    let nomView;
    let nomCss
    let pageFound;
    let index;
    let okCont = false;
    let okView = false;
    let okCss = false;
    let routeController;
    let routeViews;
    let routeCss;

    rl.question('Hello what page do you want to remove ? : Exemple (lala) ', (raw_rep) => {
        //let tab = Get_JSON("test/test.json"/*'ServExpress/lecteur_fichier.json'*/);
        let tab = Get_JSON('ServExpress/lecteur_fichier.json');
        //console.log(tab.route[0])
        for (i = 0; i < tab.route.length; i++)
        {
            //console.log(tab.route[i].name);
            if(tab.route[i].name == raw_rep)
            {
               nomCont = tab.route[i].Controller;
               routeController = "Controller/"+nomCont+".js"
               nomView = tab.route[i].Views;
               routeViews = "Views/"+nomView+".ejs"
               nomCss = tab.route[i].css;
               routeCss = "Public/Css/"+nomCss+".css"
               pageFound = true;
               index = i;
            }else
            {
                pageFound = false;
            }
        }

        if(pageFound)
        {
            console.log("you going to suppress the page",raw_rep,"and the controler",nomCont,"and the view",nomView);
            rl.question('Are you sure ? yes/no : (no) ', async (raw_rep_2) => {
                if(raw_rep_2!="" && raw_rep_2!="no" && raw_rep_2=="yes" && raw_rep_2!=undefined)
                {

                    if(await tools.NameSpace_LecteurFichiers.Fichier.VerifyFile(routeViews) == true)
                    {
                        await tools.NameSpace_LecteurFichiers.Fichier.supprimer(routeViews);
                        okView = true;
                    }
                        
                    if(await tools.NameSpace_LecteurFichiers.Fichier.VerifyFile(routeController) == true)
                    {
                        await tools.NameSpace_LecteurFichiers.Fichier.supprimer(routeController);
                        okCont = true;
                    }
                        
                    if(await tools.NameSpace_LecteurFichiers.Fichier.VerifyFile(routeCss) == true)
                    {
                        await tools.NameSpace_LecteurFichiers.Fichier.supprimer(routeCss);
                        okCss = true;
                    }
                    
                    if(okView)console.log("Vue delete");
                    if(okCont)console.log("Controller delete");
                    if(okCss)console.log("Css delete");

                    tab.route.splice(index,1);
                    let data = JSON.stringify(tab, null, 1);
                    //fs.writeFileSync('test/test.json', data);
                    fs.writeFileSync('ServExpress/lecteur_fichier.json', data);
                    rl.close();
                }else
                {
                    console.log("Mission abort !");
                    rl.close();       
                }
            });
        }else
        {
            console.log("the page don't exist. Back to the menu");
            rl.prompt();
        }
    });
    //rl.setPrompt("Supprimer page -: ");
    //rl.prompt();
}

/**
 * 
 * @param {*} name Nom de la page
 * @param {*} Views Nom du fichier views
 * @param {*} Controller Nom du controller
 * @param {*} lienss Nom des liens
 * @param {*} css Nom du fichier css fichiers de style
 */
function Edit_Json_New_Page(name, Views, Controller, lienss, css) {
    let liens;
    if (!Array.isArray(lienss)) {
        liens = [];
        liens.push(lienss);
    } else {
        liens = lienss;
    }
    let fichier = fs.readFileSync('ServExpress/lecteur_fichier.json');
    let json_parse = JSON.parse(fichier)
    const Liens = { name, liens, Views, Controller, css };
    json_parse["route"].push(Liens);
    //console.log(json_parse+" lienss : "+lienss+" liens : "+liens+" typeofliens : "+typeof(liens));
    let data = JSON.stringify(json_parse, null, 1);
    //fs.writeFileSync('test/test.json', data);
    fs.writeFileSync('ServExpress/lecteur_fichier.json', data);
}

function Get_JSON(path)
{
    let fichier = fs.readFileSync(path);
    let json_parse = JSON.parse(fichier);
    return json_parse;
}

rl.setPrompt(cliConfig.promptPrefix);
rl.prompt();