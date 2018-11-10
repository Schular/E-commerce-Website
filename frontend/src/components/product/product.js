import React, { Component } from 'react';
import './product.css';
import ProductsRepository from '../../repositories/ProductsRepository';

class Product extends Component {
  constructor() {
    super();
    this.state = {
      product: []
    };
  }

  getProductData() {
    ProductsRepository.getProductDataById(this.props.match.params.id)
      .then(product => this.setState({product}))
      .catch(err => { console.log(err); this.props.history.push(`/`)});
  }

  componentDidMount() {
    this.getProductData();
  }

  render() {
    return (
      <div className="product-container">
        <h1 className="product-name">#{this.state.product.id} {this.state.product.name}</h1>
        <div className="product-description"><b>Description:</b> {this.state.product.description}</div>
        <div className="product-price"><b>Pret:</b> {this.state.product.price} €</div>
        <div className="add-cart" onClick={() => this.props.addToCart(this.state.product)}>
          Add to cart <i className="fa fa-shopping-cart"></i>
        </div>
      </div>
    );
  }
}

export default Product;
