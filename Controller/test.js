/**
 * @description Controller generate by command line
 * @param {*} data send in POST or GET
*/

exports.Controller = async function Controller(data) {
    console.log("Controller")
    /**
     * @description Principal return Object
     */
    let fonctionController = [];

    if (data.data_get != null) {
        fonctionController.data = 'Infomations';
        //fonctionController.url_Redirect = "/test";
        fonctionController.persistence = true;
        fonctionController.use_redirect = false;

        fonctionController.data = data.data_get;
    }

    return fonctionController;
};
