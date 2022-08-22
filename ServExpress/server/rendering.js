const handleError = require('../module/Error/main.js');
const beautyLogs = require('../module/BeautyLogs/main');

/**
 * 
 * @param {Object} response 
 * @param {String} view 
 * @param {Object} datas 
 * @param {String} error 
 */
exports.rendering = async function(response, view, datas, error = false) {
    beautyLogs.bLogs(`Rendering : ${error!=false?`Error Page-[${view}]`:view}`)
    response.render(view, datas)
    response.end();
}
