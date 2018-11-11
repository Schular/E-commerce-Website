import React, { Component } from 'react';
import './cart.css';
import OrderRepository from '../../repositories/OrderRepository';

class Cart extends Component {

  sendOrder(e, products) {
    const form = new FormData(document.querySelector('form'));
    const data = {
      products,
      user: {
        name: form.get('name'),
        address: form.get('address'),
        phone: form.get('phone')
      }
    }
    
    e.preventDefault();
    OrderRepository.sendOrder(data)
      .then(this.props.history.push(`/`))
      .catch((e) => console.log(e));
  }

  calcTotal(products) {
    let total = 0;

    products.map(product => total += product.price * product.quantity)
    return (
      <h2 className="total-price">Total: {total} €</h2>
    )
  }

  render() {
    // productects from same component are not equal, generating duplicate after using new Set
    // I had to stringify first and convert them back to productects
    let { cart } = this.props;
    cart = [...new Set(cart.map(product => JSON.stringify(product)))];
    cart = cart.map(product => JSON.parse(product));

    return (
      <div className="cart-container">
        <h1>Cart</h1>
        {cart.length ? (
        <div className="split-container">
          <div className="cart-right">
          <table className="table">
            <tbody>
              <tr>
                <td className="table-header">Name</td>
                <td className="table-header">Quantity</td>
                <td className="table-header">Price</td>
              </tr>
              {cart.map(product =>
                <tr key={product.id}>
                  <td className="table-cell">{product.name}</td>
                  <td className="table-cell">{product.quantity = 
                    this.props.cart.filter((p) => p.id === product.id).length}</td>
                  <td className="table-cell">{product.price}</td>
                </tr>
              )}
              </tbody>
            </table>
          </div>
          <div className="cart-left">
            <form onSubmit={(e) => this.sendOrder(e, cart)}>
              <input type="text" name="name" placeholder="Your Name" minLength="6" required/>
              <input type="text" name="address" placeholder="Address" minLength="10" required/>
              <input type="tel" name="phone" placeholder="Phone Number" minLength="8" required/>
              {cart.length ? this.calcTotal(cart) : ''}
              <button type="submit" className="cart-buy">Place order</button>
            </form>
          </div>
        </div>
        ) : (
          <div className="error-message">
            <h4>No paws added in the cart. :(</h4>
            <h5>Please go back to
              <span className="main-page" onClick={() => this.props.history.push(`/`)}> main page </span> 
              and add some!</h5>
        </div>
        )}
      </div>
    );
  }
}

export default Cart;