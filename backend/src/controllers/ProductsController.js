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

  getProductById(req, res) {
    ProductsService.getProductById(req.params.id)
      .then((data) => {
        return res.json(data);
      });
  }

  editProduct(req, res) {
    ProductsService.editProduct(req.body)
      .then((data) => {
        return res.json(data);
      })
  }

  deleteProduct(req, res) {
    ProductsService.deleteProduct(req.body.id)
      .then((data) => {
        return res.json(data);
      })
  }

  addProduct(req, res) {
    ProductsService.addProduct(req.body)
      .then((data) => {
        return res.json(data);
      });
  }
}

module.exports = new ProductsController();