import { EPS } from './EPS/index.js'
const server = new EPS
// set port
/* server.port(3000) */

// set route
/*
server.route(
    //route1
    {
        method: "get"
        path: "/"
        callback(req,res,next){ res.sen('RapideNodeJS') }
    },
    //route2
    {
        method: "get"
        path: "/foo"
        callback(req,res,next){ res.sen('foo') }
    },
    //route3
    {
        method: "get"
        path: "/bar"
        callback(req,res,next){ res.sen('bar') }
    }
    // ...
)
*/

// 'app.use'
/* server.use('public') // accept callback or path */

// 'app.set'
/* server.set('key', value) */

//app.param (in dev)
/* server.param('param', (req,res,next,val)=>{}) */



server.run() // port 3000 by defaut