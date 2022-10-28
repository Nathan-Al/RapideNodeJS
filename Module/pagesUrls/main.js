const fs = require('fs');
/**
 * A module to ease the use of the JSON urls
 * 
 * @param {String} pageName The name of the object who contain the page information
 * @param {String} group The group where the object are
 */
module.exports.getUrls = async function (pageName, group) {
    try {
        let jsonUrlsArray = await JSON.parse(fs.readFileSync('./ServExpress/urls.json')).route
        return jsonUrlsArray[group][pageName]['link']
    } catch (error) {
        console.log(error)
        return false
    }
}