/**
 * @description Controller generate by command line
 * @param {*} data send in POST or GET
*/

exports.Controller = asyncfunctionController(data) {

    /**
     * @description Principal return Object
     */
    let varfonctionController = [];

    if (data.data_get == null && data.data_post == null) {


        returnfonctionController;

    } elseif(data != undefined && data != 'no_data') {

        fonctionController.use_redirect = false;

        fonctionController.url_Redirect = '/';

        fonctionController.persistence = false;

    if(data) {
        letinfo_get;
        letinfo_post;

        if(data.data_post != null) {

        }elseif(data.data_get != null) {

        }
    } else {
        returnnewError('Controllererror:aucuneinformationsenvoyer');
    }

    returnfonctionController;
    } else {
        return new Error('Controllererror:Aucuneinformationsn a été envoyer');
    }
};
