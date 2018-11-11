import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Switch } from 'react-router';
import Toastr from 'toastr/toastr';
import 'font-awesome/css/font-awesome.min.css';
import 'toastr/build/toastr.css';
import './App.css';
import Products from './components/products/products';
import Product from './components/product/product';
import Cart from './components/cart/cart';
import Header from './components/header/header';
import Login from './components/login/login';
import Orders from './components/orders/orders';
import NotFound from './components/NotFound/notfound';

class App extends Component {
  constructor() {
    super();
    this.state = {
      cart: [],
      admin: false,
      loggedIn: false
    };
  }

  handleUserStatus = (adminStatus, value) => {
    this.setState({ admin: adminStatus ? 1 : false, loggedIn: value });
  }

  addToCart = (product) => {
    let check = true;

    if (product.hasOwnProperty('quantity')) {
      delete product.quantity;
      check = false;
    }
    if (check) {
      Toastr.success(`Added product ${product.name} to cart!`, 'Added!', { timeOut: 1000 })
    }

    this.setState({ cart: [...this.state.cart, product] });
  }

  removeFromCart = (product) => {
    Toastr.error(`Removed product ${product.name} from cart!`, 'Removed!', { timeOut: 1000 })
    this.setState({ cart: [...this.state.cart.filter(p => p.name !== product.name)] });
  }

  clearCart = () => {
    this.setState({ cart: [] });
  }

  removeQuantity = (id) => {
    let newArray = this.state.cart;
    const index = this.state.cart.findIndex((product) => product.id === id);
    newArray.splice(index, 1)

    this.setState({ cart: newArray });
  }

  render() {
    return (
      <div className="App">
        <Route path="/" name="header" render={(props) =>
          <Header
            {...props}
            admin={this.state.admin}
            loggedIn={this.state.loggedIn}
            handleUserStatus={this.handleUserStatus}
          />}
        />
        <Switch>
          <Route exact path="/orders" name="orders" render={(props) =>
            <Orders
              {...props}
              admin={this.state.admin}
            />}
          />
          <Route exact path="/login" name="login" render={(props) =>
            <Login
              {...props}
              handleUserStatus={this.handleUserStatus}
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
              removeQuantity={this.removeQuantity}
              addToCart={this.addToCart}
              cart={this.state.cart}
            />}
          />
          <Route exact path="/product" name="product" render={(props) =>
            <Product
              {...props}
              addToCart={this.addToCart}
              cart={this.state.cart}
              admin={this.state.admin}
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
          <Route path='/404' component={NotFound} />
          <Redirect from='*' to='/404' />
        </Switch>
      </div>
    );
  }
}

export default App;
