/**
 * @param {*} ControllerDatas All the parameter send by the server
 */
 module.exports.Controller = async function Controller(context) {
    let fonctionController = [];
    //console.log("Controller : " + data)
    let exemple = "Are ya winning son ?";
    fonctionController.weirdquestion = exemple;

    // Even if it's empty always return ta variable
    return context;
};
