const fs = require('fs')
let fsPromises = require('fs').promises;
const child_proc = require('child_process');
const os = require('os');

/**
 * @name LecteurFichiers
 * @description Fonction with all the function handle files
 * @typedef {Object} LecteurFichiers
 * @property {Object} Dossier Everything that concern the use of dirs
 * @property {Object} Fichier Everything that concern the use of files
 *
 * @created 22/03/2020
 */
const LecteurFichiers = {
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
            let documentReturn = await fsPromises.readdir(liensDossier);
            return documentReturn;
        },
        ScanController: async function ScanController(liensDossier) {
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
                            await fsPromises.writeFile(destination + nom + extensions, data, (err) => {
                                throw err;
                            });
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
        /**
         * Verify that a file exist
         * 
         * @typedef {Object} options
         * @property {array} exts the possible different extenions that the files may have
         * @param {options} options [exts:array]
         * @param {String} path The full path were the file is
         * @returns boolean | String
        */
        VerifyFile: async function VerifierExisteFiles(path, options = {exts:[]}) {
            try {
                if(options['exts'].length != 0) {
                    for (const element in options['exts']) {
                        if (await fs.existsSync(path+'.'+options['exts'][element]))
                            return path+'.'+options['exts'][element];
                    }
                }

                if (await fs.statSync(path)) {
                    return true;
                }
            } catch (err) {
                return false;
            }
        },
        /**
         * Function that allow to write in a file
         * 
         * @param {String} path 
         * @param {String} datas 
         * 
         * @throw fs WriteStream Error
         * 
         * @returns boolean
         */
        ecrire: async function EcrireDansFichiers(path, datas) {
            if (!fs.statSync(path)) {
                if (err.code === 'EEXIST') {
                    console.error('myfile already exists');
                    throw err;
                }
                throw err;
            } else {
                let write = await fs.createWriteStream(path,{flags:'rs+'})
                await write.write(datas, 'utf-8')

                return write.on('end', async function() {
                        resolve(true);
                    }).on('error', async(err) => {
                        console.log("Erreur to read on data :: " + err);
                        throw err;
                    })
            }
        },
        supprimer : async function SupprimerFichiers(path)
        {
            if(NameSpace_LecteurFichiers.Fichier.VerifyFile(path))
            {
                fs.unlink(path, function(err) {
                    if (err) 
                        return false;
                    else
                        return true;
                  });
            }else
            {
                return false;
            } 
        }
    }
}

exports.LecteurFichiers = LecteurFichiers;
