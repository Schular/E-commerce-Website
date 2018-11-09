const dbConnection = require('../dbConnection/dbConnection');

class ProductsService {
    constructor() {
    }

    getAllProducts() {
        return dbConnection.query('SELECT * FROM products LIMIT 0,10')
    }

    getProductsPages() {
        return dbConnection.query('SELECT CAST((COUNT(id) / 10) AS UNSIGNED) AS pages FROM products');
    }

    getOrderedProducts(value, page) {
        const limit = 10;
        page = page * 10 - limit;
        switch (value) {
            case "name-ascending": 
                return dbConnection.query(`SELECT * FROM products ORDER BY name ASC LIMIT ${page}, ${limit}`);
            case "name-descending": 
                return dbConnection.query(`SELECT * FROM products ORDER BY name DESC LIMIT ${page}, ${limit}`); break;
            case "price-ascending": 
                return dbConnection.query(`SELECT * FROM products ORDER BY price ASC LIMIT ${page}, ${limit}`); break;
            case "price-descending": 
                return dbConnection.query(`SELECT * FROM products ORDER BY price DESC LIMIT ${page}, ${limit}`); break;
        }
    }
}

module.exports = new ProductsService();