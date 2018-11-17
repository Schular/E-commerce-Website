import React, { Component } from 'react';
import Toastr from 'toastr/toastr';
import './header.css';

class Header extends Component {
  handleLogOut() {
    Toastr.error(`You were logged out!`, 'Goodbye!', { timeOut: 3000 });
    this.props.handleUserStatus(false, false);
    this.props.history.push(`/`);
  }

  render() {
    const { admin, loggedIn } = this.props;

    return (
      <header className="header">
          <div className="header-left" onClick={() => this.props.history.push(`/`)}>
            <i className="fa fa-paw"></i>
            <h1>Happy Paws</h1>
          </div>
          <div className="header-right">
            {loggedIn && (
            <div className="admin-pannel">
              {admin && <div className="header-icon" onClick={() => this.props.history.push(`/orders`)}>Orders</div>}
              <div className="header-icon" onClick={() => this.handleLogOut()}>Logout</div>
            </div>
            )}
            {!loggedIn && <div className="header-icon" onClick={() => this.props.history.push(`/login`)}>Login</div>}
            <i className="fa fa-shopping-cart header-icon" onClick={() => this.props.history.push(`/cart`)}></i>
          </div>
      </header>
    );
  }
}

export default Header;
