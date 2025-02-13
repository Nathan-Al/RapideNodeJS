exports.Error = class {

    response = undefined
    message = ''
    code = 0

    constructor(response, message, parameter) {
        this.response = response
        this.message = message
        this.parameter = parameter
      }

    get message ()
    {
    return this.message
    }

    get code ()
    {
    return this.code
    }

    callError ()
    {
        console.log("\n!----------------------------------!")
        console.group()
        console.warn("Impossible de trouver la ressource demander.")
        console.log(`Informations : controller-[${this.controller}], vue-[${this.vue}], url-[${this.pathname}], error message-[${this.message}]`)
        console.log('Request :', this.request.params)
        console.log('Response :', this.response.params)
        console.groupEnd()
        console.log("!----------------------------------!\n")

        response.render("./index.ejs", { Message: error})
        response.end()
    }
}