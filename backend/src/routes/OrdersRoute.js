const OrdersController = require('../controllers/OrdersController');

class OrdersRoute {
    constructor(app) {
        this.app = app;

        this.initRoutes();
    }

    initRoutes() {
        this.app.get("/orders", (req, res) => {
            OrdersController.getOrders(req, res);
        });
        this.app.post("/orders", (req, res) => {
            OrdersController.sendOrder(req, res);
        });
    }
}

module.exports = OrdersRoute;
