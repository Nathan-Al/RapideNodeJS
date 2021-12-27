/*
 * @param {*} data Donnée envoyer en POST ou GET
 */
exports.Controller = async function Controller(data) {
    var fonctionController = [];
    //console.log("Controller : " + data)
    let exemple = "Are ya winning son ?";
    fonctionController.weirdquestion = exemple;

    if (data.data_get == null && data.data_post == null) {
        /**
         * ----------------------------------------------------
         * @description Use that part to send data to the views
         * ----------------------------------------------------
         */

        return fonctionController;
    } else if (data != undefined && data != "no_data") {
        /*
         * ------------------------------------------
         * @description Use that part to process data
         * ------------------------------------------
         */
        /*
         * @argument boolean The use_redirect variable is mean to redirect to a different selected page
         */
        fonctionController.use_redirect = false;
        /*
         * @descriptionThe url_redirect variable is mean to choose the page, give it he name of the controller you want to redirect to. If you let it undefined the same page will be render
         */
        fonctionController.url_Redirect = "/";
        /*
         * @description Use that part if datas is send in POST and GET
         * ! In version 0.0.1 the persistence setting don't work !
         */
        fonctionController.persistence = true;


        /*
         * @description Use that part if you want to use POST or GET datas
         */
        if (data) {
            let info_get;
            let info_post;

            if (data.data_post != null) {
                data = data.data_post;
                let info = data.openthedoor;
                let nom = 'openthedoor';
                info_post = { nom, info };
                fonctionController.dataPost = info_post;
            } else if (data.data_get != null) {
                data = data.data_get;
                nom = data.slice(0, data.indexOf("="));
                info = data.slice(data.indexOf("=") + 1, data.length);
                info_get = { nom, info };
                fonctionController.dataGet = info_get;
            }
        } else {
            return new Error("Controller error : aucune informations envoyer");
        }

        return fonctionController;
    } else {
        return new Error("Controller error : Aucune informations n'a été envoyer");
    }
};