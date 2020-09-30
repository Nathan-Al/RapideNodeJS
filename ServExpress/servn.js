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

function data_controller(nime="") 
{
  let sisi = 
  "/* Fichier généré automatiquement Controller : "+nime+"*/ \n"+
  "exports.Controller = async function Controller(data) { \n"+
  "  var fonctionController = []; \n"+
  "  let Pages_Site = []; \n"+
  "  if (data != undefined) { \n"+
  "      return fonctionController; \n"+
  "  } else { \n"+
  '      return new Error("Controller error : Aucune informations n a été envoyer"); \n'+
  "  } \n"+
  "};"
  return sisi;
};
function data_vue(nime=""){
  let sisi = "<!-- Fichier généré automatiquement Vue : --> \n"+
  "<!DOCTYPE html> \n"+
  "<html lang='en'> \n"+
  "<head> \n"+
  "   <meta charset='UTF-8'> \n"+
  '    <meta name="viewport" content="width=device-width, initial-scale=1.0"> \n'+
  '    <link type="text/css" rel="stylesheet" href="Css\\'+nime+'.css"> \n'+
  "    <title> \n"+
  "        <%= PageTitle %> \n"+
  "    </title> \n"+
  "</head> \n"+
  "<body> \n"+
  "    <h1>Bienvenue sur la page \n"+
  "        <%= PageTitle %> \n"+
  "    </h1> \n"+
  "    <div class='conteneur'> \n"+
  "        <h1>CORP</h1> \n"+
  "    </div> \n"+
  "</body> \n"+
  "</html> \n"

  return sisi;
};

let data_css = "body \n"+
"{\n"+
"    width: 100%; \n"+
"    height: 100%; \n"+
"margin: 0%; \n"+
"padding: 0%; \n"+
"    background-color: rgb(184, 184, 184); \n"+
"} \n"+
"\n"+
".conteneur\n"+
"{"+
"    background-color: aquamarine; \n"+
"    width: 100%; \n"+
"    height: auto; \n"+
"margin: 0%; \n"+
"padding: 0%; \n"+
"}"
;

var cliConfig = {
    promptPrefix: ' > '
}

console.log('Bonjour et bienvenue dans le centre de commande ! Allez si taper votre commande : ');
rl.on('line', (reponse) => {
  if(reponse == "New Page" || reponse =="np")
  {
    rl.pause();
    NewPage();
  }else if (reponse == "help" || reponse =="h")
  {
    rl.pause();
    help();
  }else if(reponse == "exit" || reponse == "Exit")
  {
    runing = false;
  }else
  {
    if(sous_menu==false)
      console.log("! Commande inconnue !")
  }

  if(runing)
    rl.prompt();
  else
    rl.close();
});

function help()
{
  console.log("ALPHA");
  return true;
}

async function NewPage()
{
  sous_menu = true;
  rl.setPrompt("New Page -: ");

  console.log('Voulez vous avoir un non différent pour la vue et le controller yes/no ? : (no) ');
  await rl.on('line', async (raw_diff) => {
    diff = nettoyage.NettoyageCharactere_1(raw_diff)
    if(diff=="yes")
    {
      let nom_page;
      let nom_views
      let nom_controller;
      let nom_css;
      let nom_liens= [];
      let veri_page = false;
      let veri_views = false;
      let veri_controller = false;
      let veri_css = false;
      let veri_liens = false;

    /**
    * Gestion PAGE
    */
     if(veri_page==false)
      rl.question('Donner le nom de la page : ', (raw_name_ppa) => {
        name_ppa = nettoyage.NettoyageCharactere_1(raw_name_ppa);
        nom_page= name_ppa;
        veri_page==true;

        if(veri_controller==false)
        rl.question('Donner le nom du Controller : ', (raw_name_ct) => {
          name_ct = nettoyage.NettoyageCharactere_1(raw_name_ppa)
          nom_controller = name_ct;
          veri_controller = true;

          if(veri_views==false)
          rl.question('Donner le nom de la Vue : ', (raw_name_vus) => {
            name_vus = nettoyage.NettoyageCharactere_1(raw_name_ppa)
            nom_views = name_vus;
            veri_views = true;

            if(veri_css==false)
            rl.question('Donner le nom du Css : ', (raw_name_css) => {
              name_css = nettoyage.NettoyageCharactere_1(raw_name_css);
              nom_css = name_css;
              veri_css = true;

            /**
            * Gestion URL
            */
              rl.question("Voulez vous plusieurs url pour votre page ? (yes/no) : (no) ", (url_ques) => {
                if(url_ques="yes" && url_ques!="" && url_ques!="no")
                {
                  rl.question("Donner le nom des urls : ", (raw_name_lli) => {
                    name_lli = nettoyage.NettoyageCharactere_1(raw_name_lli)
                    nom_liens = name_lli.split(" ");
                    veri_liens = true;
                    console.log("Resumé des actions : Nom de la page = "+nom_page,"Nom du fichiers vue = "+nom_views,"Nom du fichuier controller = "+nom_controller,"Nom du css = "+nom_css,"Nom du ou des liens = "+nom_liens);
                    rl.question("Tout est bon ? (oui/no) : (yes) ", (final) => {
                      if(final=="yes" || final=="")
                      {
                        tools.NameSpace_LecteurFichiers.Fichier.creer("Controller", nom_controller, "js", data_controller(nom_controller));
                        tools.NameSpace_LecteurFichiers.Fichier.creer("Views", nom_views, "ejs", data_vue(nom_views));
                        tools.NameSpace_LecteurFichiers.Fichier.creer("Public\\Css", nom_css, "css", data_css);
                        Edit_Json(nom_page,nom_views,nom_controller,nom_liens,nom_css);
                        rl.close();
                      }else
                      {
                        console.log("Mission abort")
                        rl.close();
                      }
                    });
                  });
                }else if(url_ques=="" || url_ques=="no")
                {
                  rl.question("Donner le nom de l'url : ", (raw_url_resp) => {
                    url_resp = nettoyage.NettoyageCharactere_1(raw_url_resp);
                    nom_liens = url_resp;
                    veri_liens = true;
                    console.log("Resumé des actions : Nom de la page = "+nom_page,"| Nom du fichiers vue = "+nom_views,"| Nom du fichuier controller = "+nom_controller,"| Nom du ou des liens = "+nom_liens);
                    rl.question("Tout est bon ? (oui/no) : (yes) ", (final) => {
                      if(final=="yes" || final=="")
                      {
                        tools.NameSpace_LecteurFichiers.Fichier.creer("Controller", nom_controller, "js", data_controller(nom_controller));
                        tools.NameSpace_LecteurFichiers.Fichier.creer("Views", nom_css, "ejs", data_vue(nom_views));
                        Edit_Json(nom_page,nom_views,nom_controller,nom_liens,nom_css);
                        rl.close();
                      }else
                      {
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

    }else if(diff=="" || diff=="no")
    {
      console.log('Donner le nom de la page : ');
      rl.on('line', async (name) => {

        console.log("Resumé des actions : Nom de la page = "+name,"| Nom du fichiers vue = "+name,"| Nom du fichuier controller = "+name,"| Nom du ou des liens = "+name);
        rl.question("Tout est bon ? (oui/no) : (yes) ", async (final) => {
        if(final=="yes" || final=="")
          {
            await tools.NameSpace_LecteurFichiers.Fichier.creer("Controller", name, "js", data_controller(name));
            await tools.NameSpace_LecteurFichiers.Fichier.creer("Views", name, "ejs", data_vue(name));
            await tools.NameSpace_LecteurFichiers.Fichier.creer("Public\\Css", name, "css", data_css);
            Edit_Json(name,name,name,name,name)
            rl.close();
          }else
          {
            console.log("Mission abort")
            rl.close();
          }
        });
      });
    }
  });
}
/**
 * 
 * @param {*} name Nom de la page
 * @param {*} Views Nom du fichier views
 * @param {*} Controller Nom du controller
 * @param {*} lienss Nom des liens
 * @param {*} css Nom du fichier css fichiers de style
 */
function Edit_Json(name, Views, Controller, lienss, css)
{
  let liens;
  if(!Array.isArray(lienss))
  {
    liens = [];
    liens.push(lienss);
  }else
  {
    liens = lienss;
  }
  let fichier = fs.readFileSync('ServExpress/lecteur_fichier.json');
  let json_parse = JSON.parse(fichier)
  const Liens = {name, liens, Views, Controller, css};
  json_parse["route"].push(Liens);
  //console.log(json_parse+" lienss : "+lienss+" liens : "+liens+" typeofliens : "+typeof(liens));
  let data = JSON.stringify(json_parse,null,1);
  fs.writeFileSync('ServExpress/lecteur_fichier.json',data);
}

rl.setPrompt(cliConfig.promptPrefix);
rl.prompt();