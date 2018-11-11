import React, { Component } from 'react';
import './header.css';

class Header extends Component {
  handleLogOut() {
    this.props.setAdmin(false);
    this.props.history.push(`/`)
  }

  render() {
    return (
      <header className="header">
          <div className="header-left" onClick={() => this.props.history.push(`/`)}>
            <i className="fa fa-paw"></i>
            <h1>Happy Paws</h1>
          </div>
          <div className="header-right">
            {!this.props.admin && (
            <div className="admin-pannel">
              <div className="header-icon" onClick={() => this.props.history.push(`/orders`)}>Orders</div>
              <div className="header-icon" onClick={() => this.handleLogOut()}>Logout</div>
            </div>
            )}
            {!this.props.admin && <div className="header-icon" onClick={() => this.props.history.push(`/login`)}>Login</div>}
            <i className="fa fa-shopping-cart header-icon" onClick={() => this.props.history.push(`/cart`)}></i>
          </div>
      </header>
    );
  }
}

export default Header;
