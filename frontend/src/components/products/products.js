import React, { Component } from 'react';
import Sort from '../sort/sort';
import Pagination from '../pagination/pagination';
import './products.css';

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
      case '<' :
        this.handleProductsOrdering(SELECT, this.state.currPage - 1); break;
      case '>' :
        this.handleProductsOrdering(SELECT, this.state.currPage + 1); break;
      default : {
        page = parseInt(page);
        
        this.handleProductsOrdering(SELECT, page);
      }
    }
  }

  handleProductsOrdering(target, page = this.state.currPage) {
    fetch(`/products/${target.value}/${page}`)
      .then(res=>res.json())
      .then(products => this.setState({products, currPage: page}));
  }

  handleUrlProductChange(id) {
    this.props.history.push(`/product/${id}`);
  }

  componentDidMount() {
    fetch(`/products/name-ascending/${this.state.currPage}`)
      .then(res=>res.json())
      .then(products => this.setState({products}));
  }

  render() {
    const { products, currPage } = this.state;
    return (
      <div className="products-container">
        <h1>Paws</h1>
        <Sort handleProductsOrdering={this.handleProductsOrdering}/>
        {products[0] ? 
          (
            <ul className="products-grid">
              {products.map(product =>
                <li className="product-item" key={product.id}>
                  <div className="products-top">
                    <div className="empty-div"></div>
                    <h1>{product.name}</h1>
                    <i className="fa fa-info-circle" onClick={() => this.handleUrlProductChange(product.id)}></i>
                  </div>
                  <div className="products-bottom">
                    <div className="price-text"><b>Price:</b> {product.price}€</div>
                    <i className="fa fa-shopping-cart" onClick={() => this.props.addToCart(product)}></i>
                  </div>
                </li>
              )}
            </ul>
          ) : <h1>Error while trying to load the products!</h1>
        }
        <Pagination handlePageChange={this.handlePageChange} currPage={currPage}/>
      </div>
    );
  }
}

export default Products;
