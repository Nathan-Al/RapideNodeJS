var Normalisations = {
    'name': 'Normalisations . js',
    'Date de création ': '22/03/2020',
    'Utilisations': 'Nettoyage de chaine de caractère ou normalisation de données',
    'langage': 'JavaScript',
    'langue': 'Français',

    Chaine: {
        NettoyageCharactere_1: function NettoyageCharac(variable) {
            variable = variable.trim();
            let charac_a_enlever = ['\\', "/", ":", "*", "?", '"', "<", ">", "|", " ","\"",];
            charac_a_enlever.forEach(function(value) {
                variable = variable.replace(value, "");
            });
            variable = variable.trim();
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

exports.NameSpace_Normalisations = Normalisations;