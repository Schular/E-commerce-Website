import React, { Component } from 'react';
import './cart.css';

class Cart extends Component {
  render() {
    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    }
    let cart = this.props.cart.filter(onlyUnique);
    // let cart = [...new Set(this.props.cart)];
    return (
      <div className="cart-container">
        <h1>Cart</h1>
        {cart.length ? cart.map((product) =>
          <div key={product.id}>
            <div>{product.name}
              <span><b> Quantity: </b>{this.props.cart.filter((p) => p.name === product.name).length}</span>
              <span><b> Price:</b> {product.price}</span>
            </div>
            
          </div>
        ) : 
        <div>
          <h4>No paws added in the cart. :(</h4>
          <h5>Please go to main page to add new paws!</h5>
        </div>
        }
      </div>
    );
  }
}

export default Cart;