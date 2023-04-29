/**
 * @typedef {Object} serverObject
 * @property {boolean|string} parameter - All the parameter concerning the redirection and choose of the view (refer to the doc for more informations)
 * @property {any} datas - The informations that need to be send to the view. (If you need more informations efer to the doc)
 * 
 * @param {Object} serverDatas The datas send by the user from the view
 * @param {serverObject} serverObject A object create by the server for ease of use of the server parameter and datas that need to be send
 */
module.exports.Controller = async function Controller(serverDatas, serverObject) {
    if (serverDatas != undefined && serverDatas != 'no_data' || serverDatas) {
        if (serverDatas.Post != null) {
            if(typeof serverDatas.Post.data != 'undefined') {
                serverObject.datas.weirdanswerAjax = typeof (JSON.parse(serverDatas.Post.data).text) != 'undefined' ? JSON.parse(serverDatas.Post.data).text : JSON.parse(serverDatas.Post.data).data
                return serverObject;
            } else {
                serverObject.datas.weirdanswerPost = serverDatas.Post.openthedoor
            }
        } else if (serverDatas.Get != null) {
            serverObject.datas.weirdanswerGet = serverDatas.Get.split('=')[1]
        }
    } else {
        return new Error('Controller error : Aucune informations envoyer');
    }

    return serverObject;
}
