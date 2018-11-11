import React, { Component } from 'react';
import Sort from '../sort/sort';
import Pagination from '../pagination/pagination';
import './products.css';
import ProductsRepository from '../../repositories/ProductsRepository';
import Toastr from 'toastr/toastr';

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

  getProductsBySortByPage(sortType, currPage) {
    ProductsRepository.getProductsBySortByPage(sortType, currPage)
      .then(products => this.setState({ products }))
      .catch(err => console.log(err));
  }

  deleteProduct(product) {
    ProductsRepository.deleteProduct(product.id)
      .then(() => {
        Toastr.error(`The product ${product.name} was deleted!`, 'Deleted!', {timeOut: 3000})
        this.props.removeFromCart(product);
        this.getProductsBySortByPage(`name-ascending`, this.state.currPage)
      })
      .catch(err => console.log(err));
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
    this.getProductsBySortByPage(`name-ascending`, this.state.currPage);
  }

  render() {
    const { products, currPage } = this.state;
    const { admin } = this.props;

    return (
      <div className="products-container">
        <h1>Paws</h1>
        <Sort handleProductsOrdering={this.handleProductsOrdering} />
        {!products.length ? <div className="error-text">No products were found! :(</div> : ''}
        <ul className="products-grid">
          {admin && <li className="product-item add-item">
            <i className="fa fa-plus-circle" onClick={() => this.props.history.push(`/product`)}></i>
          </li>
          }
          {products.map(product =>
            <li className="product-item" key={product.id}>
              <div className="products-top">
                {!admin ? <div className="empty-div"></div> :
                  <i className="fa fa-times-circle delete-icon" onClick={() => this.deleteProduct(product)}></i>}
                <h3>{product.name}</h3>
                <i className="fa fa-info-circle" onClick={() => this.handleUrlProductChange(product.id)}></i>
              </div>
              <div className="products-bottom">
                <div className="price-text"><b>Price:</b> {product.price}€</div>
                <div onClick={() => this.props.addToCart(product)}>
                  <i className="fa fa-shopping-cart"></i>
                </div>
              </div>
            </li>
          )
          }
        </ul>
        <Pagination handlePageChange={this.handlePageChange} currPage={currPage} />
      </div>
    );
  }
}

export default Products;
