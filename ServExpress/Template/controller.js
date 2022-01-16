/**
 * @description Controller generate by command line
 * @param {*} data send in POST or GET
*/

exports.Controller = async function Controller(data) {

    /**
     * @description Principal return Object
     */
    let fonctionController = [];

    if (data.data_get == null && data.data_post == null) {


        return fonctionController;

    } else if (data != undefined && data != 'no_data') {

        fonctionController.use_redirect = false;

        fonctionController.url_Redirect = '/';

        fonctionController.persistence = false;

    if (data) {
        let info_get;
        let info_post;

        if (data.data_post != null) {

        } else if (data.data_get != null) {

        }
    } else {
        return new Error('Controller error : Aucune informations envoyer');
    }

    return fonctionController;
    } else {
        return new Error('Controller error : Aucune informations n\'a été envoyer');
    }
};
