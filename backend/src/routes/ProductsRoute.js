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

        this.app.get("/product/:id", (req, res) => {
            ProductsController.getProductById(req, res);
        });
        
        this.app.post("/product", (req, res) => {
            ProductsController.addProduct(req, res);
        });
    }
}

module.exports = ProductsRoute;
