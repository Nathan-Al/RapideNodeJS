let textToChange = document.getElementById('ajax-content')
let buttonAjax = document.getElementById('ajaxButton')

buttonAjax.addEventListener('click', async function() {
    let response = await fetchServer('formTest', {type:'Controller', endpoint:'/ajax-request', datas:"I'm the user"})
    textToChange.innerText = JSON.parse(response).weirdanswerAjax
})

/**
 * Fetch data from a server files or a controller using XMLHttpRequest
 * @typedef {(type:string, endpoint:string, data:Object)} ajaxObject
 * @typedef {(async:boolean, headerContentType:string)} parameter
 * @constructor
 * @param {ajaxObject} ajaxObject - { type:Controller | File, endpoint: './dir/file' | 'controller Name', datas: {'name':'info'} } The oject who contain all the parameter and data for endpoint
 * @param {Boolean} async Chose if the resuqate is asynchronous or not
 * @param {String} headerContentType The type parameter for the header 
 * @returns String | Object : Content of the file or reponse from the controller
 */
async function fetchServer (controller, ajaxObject, async = false, headerContentType = 'application/x-www-form-urlencoded') {
    let urlEncodedData = {},
        urlEncodedDataPairs = [],
        name = undefined,
        dataReceiv = undefined,
        fileUrl = ajaxObject.endpoint,
        dataSend = {data:{ controller:controller, data:ajaxObject.datas}}

    for (name in dataSend) {
        if (Array.isArray(dataSend[name])) {
            urlEncodedDataPairs.push({
                [name]: dataSend[name]
            });
        } else {
            urlEncodedDataPairs.push(encodeURIComponent(name) + '=' + JSON.stringify(dataSend[name]));
        }
    }
    urlEncodedData = Array.isArray(urlEncodedDataPairs)? urlEncodedDataPairs : urlEncodedDataPairs.join('&').replace(/%20/g, '+')

    let httpRequest = new XMLHttpRequest();

    if (!httpRequest) {
        console.log('<- Unable to create a instance of XMLHTTP ->');
        return false;
    }

    function alertContents() {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                if (httpRequest.response != undefined && httpRequest.response != "")
                try {
                    dataReceiv = httpRequest.response;
                } catch (error) {
                    alert('<- Unable to read the JSON files'+error+'->');
                }
            } else if (httpRequest.status === 404) {
                console.log('<- Unable to connect to the page 404 not found ->');
            } else {
                console.log('<- Something went wrong with the request ->');
            }
        }
    }

    httpRequest.onreadystatechange = await alertContents;
    httpRequest.open('POST', fileUrl, async);
    httpRequest.setRequestHeader('Content-Type', headerContentType);
    httpRequest.send(urlEncodedData);

    return dataReceiv;
}
