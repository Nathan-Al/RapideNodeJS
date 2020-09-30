/**
 * 
 * @param {*} data Donnée envoyer en POST ou GET
 */
exports.Controller = async function Controller(data) {
    var fonctionController = [];
    console.log("Data : " + data)
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
        /**
         * ------------------------------------------
         * @description Use that part to process data
         * ------------------------------------------
         */

        /**
         * @argument boolean The use_redirect variable is mean to redirect to a different page choose
         */
        fonctionController.use_redirect = false;

        /*
         * @descriptionThe url_redirect variable is mean to choose the page, give it he name of the controller you want to redirectIf you let it undefined the same page will be render
         */
        fonctionController.url_Redirect = "/";
        /**
         * @description Use that part if des données sont envoyer autant en GET quand POST
         */

        fonctionController.persistence = true;

        let postData;
        let getData;
        if (typeof data.get != 'undefined' && typeof data.post != 'undefined') {
            getData = data.get;
            postData = data.post;

            nom = getData.slice(0, getData.indexOf("="));
            let info = getData.slice(getData.indexOf("=") + 1, getData.length);
            let info_get = { nom, info };

            let data_post = postData.openthedoor;

            fonctionController.dataPost = data_post;
            fonctionController.dataGet = info_get;
        }
        /**
         * @description Use that part if you want to use POST or GET datas
         */
        else if (data) {
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
        }

        return fonctionController;
    } else {
        return new Error("Controller error : Aucune informations n'a été envoyer");
    }
};