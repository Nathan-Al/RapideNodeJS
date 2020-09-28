const fs = require('fs')
let fsPromises = require('fs').promises;
const child_proc = require('child_process');
const os = require('os');

var NameSpace_LecteurFichiers = {
    'name': 'Lecteur Fichiers . js',
    'Date de création ': '22/03/2020',
    'Utilisations': 'Fichiers classant toute fonction de lecture de document/dossier',
    'langage': 'JavaScript',
    'langue': 'Français',

    Dossier: {
        ScanDossier: async function ScanDosier(liensDossier, extensions) {
            //La valeurs extensions ne peut être que true ou false, elle détermine si les fichier && les dossier doivent être lister
            //La fonction anonyme getAsyncArray permet de récupérer les fichiers sans avoirs a utiliser de await en dehors de la fonctions
            //let promisesDocument = await fsPromises.readdir(liensDossier);
            let document = [];
            let documentReturn = await fsPromises.readdir(liensDossier);

            if (extensions) {
                return documentReturn;
            } else {
                let i = 0;
                if (documentReturn instanceof Array)
                    documentReturn.forEach((element, index) => {
                        if (element.indexOf(".") == -1) {
                            document[i] = element;
                            i++;
                        }
                    });
                return document;
            }

        },
        copier: async function CopyDir(chemin, destination) {
            if (chemin.indexOf(".") === -1) {
                await fs.stat(chemin, async function(err, stat) {
                    if (err)
                        throw err;
                    else if (stat) {
                        await fs.stat(destination, async function(err, stat) {
                            if (stat) {
                                if (os.platform() == "win32") {
                                    try {
                                        chemin = chemin.replace("/", "\\");
                                        destination = destination.replace("/", "\\");
                                        let nameDoc = chemin.substring(chemin.lastIndexOf("\\") + 1).replace("\\", "");
                                        await NameSpace_Test.Dossier.créer(destination, nameDoc);
                                        child_proc.exec('xcopy /e ' + chemin + " " + destination + "\\" + nameDoc, (err, stdout, stderr) => {
                                            if (err) console.log(err);
                                        });
                                    } catch (err) {
                                        console.log(err);
                                    }
                                } else if (os.platform() == "linux") {
                                    try {
                                        chemin = chemin.replace("\\", "/");
                                        destination = destination.replace("\\", "/");
                                        let nameDoc = chemin.substring(chemin.lastIndexOf("/") + 1).replace("/", "");
                                        await NameSpace_Test.Dossier.créer(destination, nameDoc);
                                        child_proc.exec('cp -r ' + chemin + " " + destination + "/" + nameDoc, (err, stdout, stderr) => {
                                            if (err) console.log(err);
                                        });
                                    } catch (err) {
                                        console.log(err)
                                    }
                                }
                            } else if (err) {
                                throw err;
                            }
                        })
                    }
                })
            }
        },
        ScanViews: async function ScanViews(liensDossier) {
            let document = [];
            let documentReturn = await fsPromises.readdir(liensDossier);
            return documentReturn;
        },
        ScanController: async function ScanController(liensDossier) {
            let document = [];
            let documentReturn = await fsPromises.readdir(liensDossier);
            return documentReturn;
        }
    },

    Fichier: {
        lire: async function LireDansFichiers(fichiers) {

            if (typeof(fichiers) == 'string') {
                let readS;
                try {
                    readS = await fs.createReadStream(fichiers);
                } catch (err) {
                    throw err;
                }
                let datas = [];
                datas[0] = fichiers;
                let buffed = Buffer.alloc(10);

                if (await readS.readable) {
                    console.log("Lisable");
                    await readS.on('data', function(chunk) {
                        buffed = chunk;
                    }).on('error', async(errt) => {
                        console.log("Erreur to read on data :: " + errt);
                        throw errt;
                    });
                    datas[1] = await new Promise(function(resolve, reject) {
                        readS.on('end', async function() {
                            resolve(await buffed.toString());
                        }).on('error', async(err) => {
                            console.log("Erreur to read on data :: " + err);
                            throw err;
                        })
                    })
                    return datas;
                } else {
                    return new Error("Stream non lisible : Le fichiers n'est pas lisible")
                }

            } else {
                return new Error("La variable envoyée n'est pas une variable.");
            }

        },
        copier: async function CopyFiles(path, destination) {
            //console.log("path : "+path+" destination : "+destination)
            // Fonction de copy de fichiers il faut pour cela que : path = dossier/fichier.ext : & : destination = dossier/fichiers.ext :
            let nomdoc = path.substring(path.lastIndexOf("/") + 1).replace("/", "")
            fs.stat(path, (err, stat) => {

                if (err) {
                    console.log("Erreur to stat : " + err);
                    throw err;
                } else {
                    let total = stat.size
                    let progress = 0
                    let read = fs.createReadStream(path)
                    let write = fs.createWriteStream(destination + "/" + nomdoc)

                    read.on('data', (chunk) => {
                        progress += chunk.length
                        console.log(Math.round(100 * progress / total) + "%")
                    }).on('error', (error) => {
                        console.log("Erreur to read on data :: " + error);
                        throw error;
                    })

                    read.pipe(write).on('error', (error) => {
                        console.log("Erreur to read.pipe :: " + error);
                        throw error;
                    })

                    write.on('finish', () => {
                        console.log("Fait")
                        return true;
                    }).on('error', (error) => {
                        console.log("Erreur to write :: " + error);
                        throw error;
                    })
                }
            });
        }, 
        creer: async function CreeFichier(destination ="", nom="", extensions="", data="") {
            if (nom.lastIndexOf("/") != "-1")
                nom.replace("/", "")
            if (nom.lastIndexOf(".") != -1)
                nom = nom.slice(0, nom.lastIndexOf("."))

            if (destination != "" && nom != "" || destination != null && nom != null) {
                if (destination.slice(-1) != "/") {
                    destination = destination + "/";
                }

                destination = destination.replace("//", "/");

                if (extensions.lastIndexOf(".") == -1 || extensions.lastIndexOf(".") != 0)
                    extensions = "." + extensions;

                await fs.stat(destination, async function(err, stat) {
                    if (stat) {
                        try {
                            await fsPromises.writeFile(destination + nom + extensions, (err) => {
                                throw err;
                            });
                            try {
                                await NameSpace_LecteurFichiers.Fichier.ecrire(destination + nom + extensions,data)
                            }catch(e)
                            {
                                throw e;
                            }
                            return true;
                        } catch (Exception) {
                            throw Exception;
                        }
                    } else {
                        throw err;
                    }
                });
            }
        },
        VerifyFile: async function VerifierExisteFiles(path) {
            try {
                if (await fs.statSync(path))
                    return true;
            } catch (err) {
                return new Error("ERREUR : Le Fichier demmander n'existe pas");
            }
        },
        ecrire: async function EcrireDansFichiers(path, trucAEcrire) {
            //fs.stat(path, async(err, stat) => {
            if (!fs.statSync(path)) {
                if (err.code === 'EEXIST') {
                    console.error('myfile already exists');
                    throw err;
                }
                throw err;
            } else {
                let write = await fs.createWriteStream(path,{flags:'rs+'})
                await write.write(trucAEcrire, 'utf-8')

                //let j = await new Promise(function(resolve, reject) {
                let k = write.on('end', async function() {
                        resolve(true);
                    }).on('error', async(err) => {
                        console.log("Erreur to read on data :: " + err);
                        throw err;
                    })
                    //})

                return k;
            }
            // });
        }
    }
}

exports.NameSpace_LecteurFichiers = NameSpace_LecteurFichiers;

var NameSpace_Normalisations = {
    'name': 'Normalisations . js',
    'Date de création ': '22/03/2020',
    'Utilisations': 'Nettoyage de chaine de caractère ou normalisation de données',
    'langage': 'JavaScript',
    'langue': 'Français',

    Chaine: {
        NettoyageCharactere_1: function NettoyageCharac(variable) {
            console.log(variable)
            variable = variable.trim();
            let charac_a_enlever = ['\\', "/", ":", "*", "?", '"', "<", ">", "|", " "];
            charac_a_enlever.forEach(function(value) {
                variable = variable.replace(value, "");
            });
            variable = variable.trim();

            console.log(variable)
            return variable;
        },
        MajusculePremiereLettre: function upperCaseFirstLetter(str) {
            return str.replace(/\w\S*/g, function(txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            });
        },
        NettoyageCharactere_2: NettoyageCharacter = async function nettoyageCharacters(chaineCarach) {
            await chaineCarach.replace(
                'ÀÁÂÃÄÅÇÈÉÊËÌÍÎÏÒÓÔÕÖÙÚÛÜÝàáâãäåçèéêëìíîïðòóôõöùúûüýÿ',
                'AAAAAACEEEEIIIIOOOOOUUUUYaaaaaaceeeeiiiioooooouuuuyy');
            await chaineCarach.replace('/([^.a-z0-9]+)/i ', '');
            await chaineCarach.toLowerCase(chaineCarach);

            return chaineCarach;
        }
    }
}

exports.NameSpace_Normalisations = NameSpace_Normalisations;