const ProductsRoute = require('./routes/ProductsRoute');
const OrdersRoute = require('./routes/OrdersRoute');
const AuthenticationRoute = require('./routes/AuthenticationRoute');

const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

new ProductsRoute(app);
new OrdersRoute(app);
new AuthenticationRoute(app);

app.listen(port, () => { console.log(`Server started on port ${port}...`)})