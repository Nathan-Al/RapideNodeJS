/**
 * COMMAND LINE
 * VERSION 1.0.2 (OBSOLETE)
 * DATE DE CREATION 27/09/2020
 * LICENSE OPEN SOURCE
 * CONTACT nathan.maserakan@gmail.com
 * @deprecated
 */
const process = require('process');
const fs = require("fs")
const rl = require('readline').createInterface(process.stdin, process.stdout);
let filesGestion = require("./module/Tools/files.js");
let normarlisation = require("./module/Tools/normalisations.js");
let nettoyage = normarlisation.NameSpace_Normalisations.Chaine;
let sous_menu = false;

function data_controller ()
{
    return fs.readFileSync('ServExpress/Template/controller.js');
}

function data_view ()
{
    return fs.readFileSync('ServExpress/Template/view.ejs');
}

function data_css ()
{
    return fs.readFileSync('ServExpress/Template/base.css');
}

var cliConfig = {
    promptPrefix: 'Menu > '
}

help();
rl.question('Hello and welcome to the command prompt ! You can type your command : ', (response) => {
    switch (response) {
        case 'np':
            NewPage();
            break;
        case 'd':
            SuppPage();
            break;
        case 'h':
            help();
            break;
        case 'x':
            rl.close();
            break;
        default:
            console.log("! Command not found !")
            break;
    }

});

/**
 * @description Informations about the commands
 * @return {void}
 */
function help() {
    console.log("--- HELP ---");
    console.log("- %cnp%c - To create a new page \n- %cd%c - Give you the possibility to delete a page \n- %cx%c - Close the command prompt", 'color:blue;', 'color:blue;', 'color:blue;', 'color:blue;', 'color:blue;', 'color:blue;');
    return true;
}

async function NewPage() {
    sous_menu = true;
    rl.setPrompt("New Page > ");
    rl.setPrompt(`Do you want to have different name for the page name,view,controller,css,url ? yes or y/no ? (no) : `);
    rl.prompt();

    await rl.on('line', async(raw_diff) => {
        let diff = nettoyage.NettoyageCharactere_1(raw_diff)
        if (diff === 'yes' || diff === 'y') {
            let nom_page;
            let nom_views
            let nom_controller;
            let nom_css;
            let nom_liens = [];

            /**
             * Gestion PAGE
             */
            rl.question('What do you want to name the page ? : ', (raw_name_ppa) => {
                nom_page = nettoyage.NettoyageCharactere_1(raw_name_ppa);

                /**
                 * Gestion CONTROLER
                 */
                    rl.question('Give the controller name : ', (raw_name_ct) => {
                        nom_controller = nettoyage.NettoyageCharactere_1(raw_name_ct)

                        /**
                         * Gestion VIEWS
                         */
                            rl.question('Give the view name : ', (raw_name_vus) => {
                                nom_views = nettoyage.NettoyageCharactere_1(raw_name_vus)

                                /**
                                 * Gestion CSS
                                 */
                                    rl.question('Give the css name : ', (raw_name_css) => {
                                        nom_css = nettoyage.NettoyageCharactere_1(raw_name_css);

                                        /**
                                         * Gestion URLS
                                         */
                                        rl.question("Do you want to have multiple url ? (yes/no) : (no) ", (url_ques) => {
                                            if (url_ques === "yes" && url_ques != "" && url_ques != "no") {
                                                rl.question("Give the urls name : ", (raw_name_lli) => {
                                                    nom_liens = nettoyage.NettoyageCharactere_1(raw_name_lli).split(" ");

                                                    console.log("Summarize actions : Page name = " + nom_page, "view name = " + nom_views, "controller name = " + nom_controller, "css name = " + nom_css, "url(s) name = " + nom_liens);
                                                    rl.question("All good ? (oui/no) : (yes) ", (final) => {
                                                        if (final == "yes" || final == "") {
                                                            filesGestion.NameSpace_LecteurFichiers.Fichier.creer("Controller", nom_controller, "js", data_controller());
                                                            filesGestion.NameSpace_LecteurFichiers.Fichier.creer("Views", nom_views, "ejs", data_view());
                                                            filesGestion.NameSpace_LecteurFichiers.Fichier.creer("Public\\Css", nom_css, "css", data_css());
                                                            Edit_Json_New_Page(nom_page, nom_views, nom_controller, nom_liens, nom_css);
                                                            console.log("Task perform")
                                                            rl.close();
                                                        } else {
                                                            console.log("Mission abort")
                                                            rl.close();
                                                        }
                                                    });
                                                });
                                            } else if (url_ques === "" || url_ques === "no") {
                                                rl.question("Give the url name : ", (raw_url_resp) => {
                                                    nom_liens = nettoyage.NettoyageCharactere_1(raw_url_resp);
                                                    console.log("Summarize actions : Page name = " + nom_page, "| view name = " + nom_views,"| css name = " + nom_css,"| controller name = " + nom_controller, "| url(s) name = " + nom_liens);

                                                    rl.question("All good ? (yes/no) : (yes) ", (final) => {
                                                        if (final == "yes" || final == "") {
                                                            filesGestion.NameSpace_LecteurFichiers.Fichier.creer("Controller", nom_controller, "js", data_controller());
                                                            filesGestion.NameSpace_LecteurFichiers.Fichier.creer("Views", nom_views, "ejs", data_view());
                                                            filesGestion.NameSpace_LecteurFichiers.Fichier.creer("Public\\Css", nom_css, "css", data_css());
                                                            Edit_Json_New_Page(nom_page, nom_views, nom_controller, nom_liens, nom_css);
                                                            console.log("Task perform")
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
                        await filesGestion.NameSpace_LecteurFichiers.Fichier.creer("Controller", name, "js", data_controller());
                        await filesGestion.NameSpace_LecteurFichiers.Fichier.creer("Views", name, "ejs", data_view());
                        await filesGestion.NameSpace_LecteurFichiers.Fichier.creer("Public/Css", name, "css", data_css());
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
        let tab = Get_JSON('ServExpress/urls.json');
        for (let i = 0; i < tab.route.length; i++)
        {
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

                    if(await filesGestion.NameSpace_LecteurFichiers.Fichier.VerifyFile(routeViews) == true)
                    {
                        await filesGestion.NameSpace_LecteurFichiers.Fichier.supprimer(routeViews);
                        okView = true;
                    }
                        
                    if(await filesGestion.NameSpace_LecteurFichiers.Fichier.VerifyFile(routeController) == true)
                    {
                        await filesGestion.NameSpace_LecteurFichiers.Fichier.supprimer(routeController);
                        okCont = true;
                    }
                        
                    if(await filesGestion.NameSpace_LecteurFichiers.Fichier.VerifyFile(routeCss) == true)
                    {
                        await filesGestion.NameSpace_LecteurFichiers.Fichier.supprimer(routeCss);
                        okCss = true;
                    }
                    
                    if(okView)console.log("Vue delete");
                    if(okCont)console.log("Controller delete");
                    if(okCss)console.log("Css delete");

                    tab.route.splice(index,1);
                    let data = JSON.stringify(tab, null, 1);

                    fs.writeFileSync('ServExpress/urls.json', data);
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
}

/**
 * 
 * @param {*} name Nom de la page
 * @param {*} Views Nom du fichier views
 * @param {*} Controller Nom du controller
 * @param {*} links Nom des liens
 * @param {*} css Nom du fichier css fichiers de style
 */
function Edit_Json_New_Page(name, Views, Controller, links, css) {
    let liens;
    if (!Array.isArray(links)) {
        liens = [];
        liens.push(links);
    } else {
        liens = links;
    }
    const Liens = { name, liens, Views, Controller, css };
    let fichier = fs.readFileSync('ServExpress/urls.json');
    let json_parse = JSON.parse(fichier)
    json_parse["route"].push(Liens);

    let data = JSON.stringify(json_parse, null, 1);

    fs.writeFileSync('ServExpress/urls.json', data);
}

function Get_JSON(path)
{
    let fichier = fs.readFileSync(path);
    return JSON.parse(fichier);
}

rl.setPrompt(cliConfig.promptPrefix);
rl.prompt();