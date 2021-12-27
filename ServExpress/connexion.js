var mysql = require('mysql');
let host = '';
let user = '';
let password = '';
let database = '';

function MySQLCo() {
    var con = mysql.createConnection({
        host,
        user,
        password,
        database
    });
    if (host != '' && user != '' && password != '' && database != '') {
        con.connect(function(err) {
            if (err) throw err;
            return true;
        });
    } else {
        return false;
    }

}

exports.MySQLCo = MySQLCo;