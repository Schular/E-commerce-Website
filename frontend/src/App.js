import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import 'font-awesome/css/font-awesome.min.css';
import Products from './components/products/products';
import Product from './components/product/product';
import Cart from './components/cart/cart';
import Header from './components/header/header';

class App extends Component {
  constructor() {
    super();
    this.state = {
      cart: []
    };
  }

  addToCart = (product) => {
    this.setState({ cart: [...this.state.cart, product] });
  }

  render() {
    return (
      <div className="App">
        <Route path="/" name="header" component={Header}></Route>
        <Route exact path="/" name="products" render={(props) =>
          <Products
            {...props}
            addToCart={this.addToCart}
            cart={this.state.cart}
          />}
        />
        <Route exact path="/cart" name="cart" render={(props) =>
          <Cart
            {...props}
            addToCart={this.addToCart}
            cart={this.state.cart}
          />}
        />
        <Route exact path="/product/:id" name="product" render={(props) =>
          <Product
            {...props}
            addToCart={this.addToCart}
            cart={this.state.cart}
          />}
        />
      </div>
    );
  }
}

export default App;
