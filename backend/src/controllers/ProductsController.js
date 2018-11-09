const ProductsService = require('../services/ProductsService');

class ProductsController {
    constructor() {
    }

    getAllProducts(req, res) {
        ProductsService.getAllProducts()
        .then((data) => {
            return res.json(data);
        });
    }

    getProductsPages(req, res) {
        ProductsService.getProductsPages()
        .then((data) => {
            return res.json(data[0].pages);
        });
    }

    getOrderedProducts(req, res) {
        ProductsService.getOrderedProducts(req.params.order, req.params.page)
        .then((data) => {
            return res.json(data);
        });
    }
}

module.exports = new ProductsController();