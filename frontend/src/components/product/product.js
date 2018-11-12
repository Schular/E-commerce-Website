import React, { Component } from 'react';
import Toastr from 'toastr/toastr';
import ProductsRepository from '../../repositories/ProductsRepository';
import './product.css';

class Product extends Component {
  constructor() {
    super();
    this.state = {
      product: [],
      title: '',
      image: ''
    };
  }

  getProductData() {
    if (Number(this.props.match.params.id)) {
      ProductsRepository.getProductDataById(this.props.match.params.id)
        .then(product => product ? this.setState({ product }) : this.props.history.push(`/`))
        .catch(err => { console.log(err); this.props.history.push(`/404`) });
    } else {
      this.props.history.push(`/404`);
    }
  }

  getRandomKitty() {
    fetch(`https://api.thecatapi.com/v1/images/search?size=full`)
      .then(response => response.json())
      .then(result => this.setState({ image: result[0].url }))
      .catch(err => console.log(err));
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
        .then(() => {
          Toastr.success('You have successfully added the product!', 'Success!', { timeOut: 3000 });
          this.props.history.push(`/`);
        })
        .catch((err) => console.log(err));
    } else if (action === 'Edit') {
      ProductsRepository.editProduct(product)
        .then(() => {
          Toastr.success('You have successfully edited the product!', 'Success!', { timeOut: 3000 });
          this.props.history.push(`/`);
        })
        .catch((err) => console.log(err));
    }
  }

  componentDidMount() {
    if (this.props.match.params.id) {
      this.getProductData();
    }
    this.getRandomKitty();
  }

  handleRendering() {
    if (this.props.admin) {
      if (!this.props.match.params.id) {
        return this.renderAddEditProduct([], "Add");
      } else {
        return this.renderAddEditProduct(this.state.product, "Edit");
      }
    } else {
      if (!this.props.match.params.id) {
        this.props.history.push(`/404`);
      }
      return this.renderProduct();
    }
  }

  renderAddEditProduct(data, action) {
    return (
      <div className="product-form">
        <h1>{action} product</h1>
        <div className="split-form">
          <div className="split-left">
            <form onSubmit={(e) => this.handleAddEditProduct(e, action)}>
              <input type="text" name="name" placeholder="Product Name" defaultValue={data.name} required />
              <input type="number" name="price" placeholder="Product Price" defaultValue={data.price} required />
              <input type="text" name="description" placeholder="Description" defaultValue={data.description} required />
              <button type="submit" className="add-product">{action} product</button>
            </form>
          </div>
          <div className="split-right">
            <img src={this.state.image} alt="kitty" width="300px" />
          </div>
        </div>
      </div>
    )
  }

  renderProduct() {
    return (
      <div className="view-product">
        <h1 className="product-name">#{this.state.product.id} {this.state.product.name}</h1>
        <img src={this.state.image} alt="kitty" height="300px" />
        <div className="product-description"><b>Description:</b> {this.state.product.description}</div>
        <div className="product-price"><b>Price:</b> {this.state.product.price} €</div>
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
