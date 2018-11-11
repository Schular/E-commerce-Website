const dbConnection = require('../dbConnection/dbConnection');

class OrdersService {
    constructor() {
    }

    login(email) {
        return dbConnection.query(`SELECT * FROM users WHERE email = '${email}'`);
    }

    checkEmail(email) {
        return dbConnection.query(`SELECT * FROM users WHERE email = '${email}'`)
            .then((result) => result[0] ? result[0] : null)
            .catch((err) => console.log(err))
    }
}

module.exports = new OrdersService();