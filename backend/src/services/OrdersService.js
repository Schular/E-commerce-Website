const dbConnection = require('../dbConnection/dbConnection');

class OrdersService {
    constructor() {
    }

    sendOrder(data) {
        let query = `INSERT INTO products_ordered (product_name, price, quantity, order_number) VALUES `;

        let order = dbConnection.query(`INSERT INTO orders (name, address, phone) VALUES ('${data.user.name}', '${data.user.address}', ${data.user.phone})`);

        order.then(value => {
            let i = 0;
            let values = ``;

            for (i = 0; i < data.products.length - 1; i++) {
                values += `('${data.products[i].name}', ${data.products[i].price}, ${data.products[i].quantity}, ${value.insertId}), `;
            }
            values += `('${data.products[i].name}', ${data.products[i].price}, ${data.products[i].quantity}, ${value.insertId})`;
            return dbConnection.query(query + values);
        })
            .catch((err) => { throw new Error(err) } );
        return order;
    }
}

module.exports = new OrdersService();