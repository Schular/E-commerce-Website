const OrdersService = require('../services/OrdersService');

class OrdersController {
    constructor() {
    }

    getOrders(req, res) {
        OrdersService.getOrders()
        .then((data) => {
            return res.json(data);
        });
    }

    sendOrder(req, res) {
        OrdersService.sendOrder(req.body)
        .then((data) => {
            return res.json(data);
        });
    }
}

module.exports = new OrdersController();