/**
 * The rendering part have been separate from the requestmanager
 * for future function and security test
 * 
 * @param {Object} response 
 * @param {String} view 
 * @param {Object} datas 
 * @param {String} error 
 */
exports.rendering = async function(response, view, datas, error = false) {
    console.log(`Rendering : ${error!=false?`Error Page-[${view}]`:view}`)
    response.render(view, datas)
    response.end();
}
