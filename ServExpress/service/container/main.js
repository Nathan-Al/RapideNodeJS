const { main } = require ('../../module/Error/main')

/**
 * @description Main files for the container service
 * @param {Object} serviceObject {service:Object, parameter:any}
 * @returns {Function} any
 */
module.exports = function (serviceObject) {

    return function (req, res, next) {
        Main(serviceObject.service, serviceObject.parameter)
        next()
    }

    /**
     * @description The purpose of the container service is to make the connection 
     * between each service thus helping to manage the logs and error
     * @param {Object} service The main service to launch in the container
     * @param {Object} parameter The list of parameters to send to the service if there are any
     */
    async function Main (service, parameter) {
        console.log('[container] Starting')
        try {
            console.log('[container] Service : '+service)
            await service.Main(parameter)
        } catch (error) {
            //ErrorHandler(error, "[container] Impossible de trouver ce service")
            //TODO handle error
            main()
        }
    }

}
