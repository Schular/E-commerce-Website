import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import 'font-awesome/css/font-awesome.min.css';
import Products from './components/products/products';
import Product from './components/product/product';
import Cart from './components/cart/cart';
import Header from './components/header/header';
import Login from './components/login/login';
import Orders from './components/orders/orders';

class App extends Component {
  constructor() {
    super();
    this.state = {
      cart: [],
      admin: false
    };
  }

  setAdmin = (value) => {
    this.setState({ admin: value ? true : false });
  }

  addToCart = (product) => {
    this.setState({ cart: [...this.state.cart, product] });
  }

  removeFromCart = (product) => {
    this.setState({ cart: [...this.state.cart.filter(p => p.name !== product.name)]});
  }

  clearCart = () => {
    this.setState({ cart: []});
  }

  render() {
    return (
      <div className="App">
        <Route path="/" name="header" render={(props) =>
          <Header 
            {...props}
            admin={this.state.admin}
            setAdmin={this.setAdmin}
          />}
        />
        <Route exact path="/orders" name="orders" render={(props) =>
          <Orders 
            {...props}
            admin={this.state.admin}
          />}
        />
        <Route exact path="/login" name="login" render={(props) =>
          <Login 
            {...props}
            setAdmin={this.setAdmin}
          />}
        />
        <Route exact path="/" name="products" render={(props) =>
          <Products
            {...props}
            addToCart={this.addToCart}
            removeFromCart={this.removeFromCart}
            admin={this.state.admin}
            cart={this.state.cart}
          />}
        />
        <Route exact path="/cart" name="cart" render={(props) =>
          <Cart
            {...props}
            clearCart={this.clearCart}
            cart={this.state.cart}
          />}
        />
        <Route exact path="/product/:id" name="product" render={(props) =>
          <Product
            {...props}
            addToCart={this.addToCart}
            cart={this.state.cart}
            admin={this.state.admin}
          />}
        />
      </div>
    );
  }
}

export default App;
