/**
 * @param {Object} datas The datas send by the user from the view
 * @param {Object} serverParameter Router parameter editable by the user (refere to doc for more detail)
 * @param {Object} serverDatas The server default object to send datas to the view Ex : {name: 'Jhon Does'}
 */
 module.exports.Controller = async function Controller(datas, serverParameter, serverDatas) {
    let exemple = undefined;
    if(typeof(datas.Get)!='undefined')
        exemple = "It's nice my son.";
    serverDatas.weirdanswer = exemple;

    return serverDatas;
};
