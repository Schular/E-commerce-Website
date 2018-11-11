import React, { Component } from 'react';
import Sort from '../sort/sort';
import Pagination from '../pagination/pagination';
import './products.css';
import ProductsRepository from '../../repositories/ProductsRepository';

class Products extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      currPage: 1
    };

    this.handleProductsOrdering = this.handleProductsOrdering.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  handlePageChange(target) {
    const SELECT = document.querySelector('#sort-by');
    let page = target.dataset.value;

    switch (page) {
      case '<':
        this.handleProductsOrdering(SELECT, this.state.currPage - 1); break;
      case '>':
        this.handleProductsOrdering(SELECT, this.state.currPage + 1); break;
      default: {
        page = parseInt(page);

        this.handleProductsOrdering(SELECT, page);
      }
    }
  }

  handleProductsOrdering(target, page = this.state.currPage) {
    ProductsRepository.getProductsBySortByPage(target.value, page)
      .then(products => this.setState({ products, currPage: page }))
      .catch(err => console.log(err));
  }

  handleUrlProductChange(id) {
    this.props.history.push(`/product/${id}`);
  }

  componentDidMount() {
    ProductsRepository.getProductsBySortByPage(`name-ascending`, this.state.currPage)
      .then(products => this.setState({ products }))
      .catch(err => console.log(err));
  }

  render() {
    const { products, currPage } = this.state;
    const { admin } = this.props;

    return (
      <div className="products-container">
        <h1>Paws</h1>
        <Sort handleProductsOrdering={this.handleProductsOrdering} />
        {products[0] ?
          (
            <ul className="products-grid">
              {!admin && <li className="product-item add-item">
                <i className="fa fa-plus-circle" onClick={() => this.props.history.push(`/product/add`)}></i>
              </li>
              }
              {products.map(product =>
                <li className="product-item" key={product.id}>
                  <div className="products-top">
                    <div className="empty-div"></div>
                    <h1>{product.name}</h1>
                    <i className="fa fa-info-circle" onClick={() => this.handleUrlProductChange(product.id)}></i>
                  </div>
                  <div className="products-bottom">
                    <div className="price-text"><b>Price:</b> {product.price}€</div>
                    <div onClick={() => this.props.addToCart(product)}>
                      <i className="fa fa-shopping-cart"></i>
                    </div>
                  </div>
                </li>
              )}
            </ul>
          ) : <h1>Error while trying to load the products!</h1>
        }
        <Pagination handlePageChange={this.handlePageChange} currPage={currPage} />
      </div>
    );
  }
}

export default Products;
