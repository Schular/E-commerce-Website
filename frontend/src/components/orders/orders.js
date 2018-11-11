import React, { Component } from 'react';
import OrderRepository from '../../repositories/OrderRepository';
import './orders.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      orders: []
    };
  }

  calcTotal(orders, id) {
    let total = 0;

    orders.filter((o) => o.order_number === id).map(order => total += order.price * order.order_number);

    return (
      <b>{total} €</b>
    )
  }

  getOrdersData() {
    OrderRepository.getOrders()
      .then(result => this.setState({ users: result.users, orders: result.orders }, () => { console.log(result) }))
      .catch(err => { console.log(err); });
  }

  componentDidMount() {
    this.getOrdersData();
  }

  render() {
    const { users, orders } = this.state;

    return (
      <div className="orders-container">
        <h1>Orders</h1>
        <div className="orders-details">
          <table className="table">
            <tbody>
              <tr>
                <td className="table-header">Nr.</td>
                <td className="table-header">Details</td>
                <td className="table-header">Products</td>
                <td className="table-header">Total</td>
              </tr>
              {users.map(user =>
                <tr key={user.id} className="order-details">
                  <td><b>#{user.id}</b></td>
                  <td className="table-details">
                    <div><b>Name:</b> {user.name}</div>
                    <div><b>Address:</b> {user.address}</div>
                    <div><b>Phone:</b> {user.phone}</div>
                  </td>
                  <td className="table-products">
                    {orders.filter((e) => e.order_number === user.id).map(order =>
                      <ul key={order.id}>
                        <li>{order.product_name} <b className="color-blue">x {order.quantity}</b></li>
                      </ul>
                    )}
                  </td>
                  <td className="table-total-price">{this.calcTotal(orders, user.id)}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Login;
