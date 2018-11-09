const ProductsRoute = require('./routes/ProductsRoute');

const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());

new ProductsRoute(app);

app.listen(port, () => { console.log(`Server started on port ${port}...`)})