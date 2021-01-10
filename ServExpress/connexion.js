var mysql = require('mysql');
let host = "";
let user = "";
let password = "";
let database = "";

async function MySQLCo() {
    var con = mysql.createConnection({
        host,
        user,
        password,
        database
    });
    if (host != "" && user != "" && password != "" && database != "") {
        con.connect(function(err) {
            if (err) throw err;
            console.log("Connected to the database !");
        });
    } else {
        console.log("Aucune base de données renseigné");
    }

}

exports.MySQLCo = MySQLCo;