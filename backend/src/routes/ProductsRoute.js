const ProductsController = require('../controllers/ProductsController');

class ProductsRoute {
    constructor(app) {
        this.app = app;

        this.initRoutes();
    }

    initRoutes() {
        this.app.get("/products", (req, res) => {
            ProductsController.getAllProducts(req, res);
        });

        this.app.get("/products/pages", (req, res) => {
            ProductsController.getProductsPages(req, res);
        });
        
        this.app.get("/products/:order/:page", (req, res) => {
            ProductsController.getOrderedProducts(req, res);
        });

        // this.app.get("/products/:id", (req, res) => {
        //     ProductsController.getProductsById(req, res);
        // });
    }
}

module.exports = ProductsRoute;
