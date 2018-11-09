const mysql = require('mysql');
const fs = require('fs');

let content;

// Read from config.cnf and get the host, name and password. 1st if for default use (npm start); 2nd for debugging with F5

if (fs.existsSync('db_scripts/config.cnf'))
    content = fs.readFileSync('db_scripts/config.cnf', 'utf8').replace(/("user = |password = |host = ")/g, '');
else if (fs.existsSync('backend/db_scripts/config.cnf'))
    content = fs.readFileSync('backend/db_scripts/config.cnf', 'utf8').replace(/("user = |password = |host = ")/g, '');

const config = {
    host: content.replace(/host = /, '').split('\n')[3],
    password: content.replace(/(password = |\r)/g, '').split('\n')[2],
    user: content.replace(/(user = |\r)/g, '').split('\n')[1]
}

class DbConnection {
    constructor() {
        this.config = {
            host: config.host,
            user: config.user,
            password: config.password,
            database: "emarkt"
        }

        this.mysql = mysql;
        this.connect();
    }

    connect() {
        this.connection = mysql.createConnection(this.config);
        this.connection.connect((err) => {
            if (err) throw err;
            console.log("Connected!");
        });
    }

    query(query) {
        return new Promise((resolve, reject) => {
            this.connection.query(query, (err, results) => {
                if(err) {
                    reject(err);
                } 
                resolve(results);
            })
        })
        .catch((err) => {
			console.log(err);
			return null;
		});	
    }
}

module.exports = new DbConnection();