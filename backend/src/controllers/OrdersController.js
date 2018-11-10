const OrdersService = require('../services/OrdersService');

class OrdersController {
    constructor() {
    }

    sendOrder(req, res) {
        OrdersService.sendOrder(req.body)
        .then((data) => {
            return res.json(data);
        });
    }
}

module.exports = new OrdersController();