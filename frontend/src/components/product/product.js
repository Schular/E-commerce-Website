import React, { Component } from 'react';
import './product.css';
import ProductsRepository from '../../repositories/ProductsRepository';

class Product extends Component {
  constructor() {
    super();
    this.state = {
      product: [],
      title: ''
    };
  }

  getProductData() {
    ProductsRepository.getProductDataById(this.props.match.params.id)
      .then(product => product ? this.setState({ product }) : this.props.history.push(`/`))
      .catch(err => { console.log(err); this.props.history.push(`/`) });
  }

  handleAddEditProduct(e, action) {
    const form = new FormData(document.querySelector('form'));
    const product = {
      id: this.props.match.params.id,
      name: form.get('name'),
      price: form.get('price'),
      description: form.get('description')
    }
    
    e.preventDefault();

    if (action === 'Add') {
      ProductsRepository.addProduct(product)
        .then(this.props.history.push(`/`))
        .catch((err) => console.log(err));
    } else if (action === 'Edit') {
      ProductsRepository.editProduct(product)
        .then(this.props.history.push(`/`))
        .catch((err) => console.log(err));
    }
  }

  componentDidMount() {
    if (!this.props.admin && this.props.match.params.id !== 'add') {
      this.getProductData();
    }
  }

  handleRendering() {
    if (this.props.admin) {
      if (this.props.match.params.id === 'add') {
        return this.renderAddEditProduct([], "Add");
      } else {
        return this.renderAddEditProduct(this.state.product, "Edit");
      }
    } else {
      console.log(this.state);
      return this.renderProduct();
    }
  }

  renderAddEditProduct(data, action) {
    return (
      <div className="product-form">
        <h1>{action} product</h1>
        <form onSubmit={(e) => this.handleAddEditProduct(e, action)}>
          <input type="text" name="name" placeholder="Product Name" defaultValue={data.name} required />
          <input type="number" name="price" placeholder="Product Price" defaultValue={data.price} required />
          <input type="text" name="description" placeholder="Description" defaultValue={data.description} required />
          <button type="submit" className="add-product">{action} product</button>
        </form>
      </div>
    )
  }

  renderProduct() {
    return (
      <div>
        <h1 className="product-name">#{this.state.product.id} {this.state.product.name}</h1>
        <div className="product-description"><b>Description:</b> {this.state.product.description}</div>
        <div className="product-price"><b>Pret:</b> {this.state.product.price} €</div>
        <div className="add-cart" onClick={() => this.props.addToCart(this.state.product)}>
          Add to cart <i className="fa fa-shopping-cart"></i>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="product-container">
        {this.handleRendering()}
      </div>
    );
  }
}

export default Product;
