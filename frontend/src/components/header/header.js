import React, { Component } from 'react';
import './header.css';
import 'font-awesome/css/font-awesome.min.css';


class Header extends Component {
  render() {
    return (
      <header className="header">
          <div className="header-left" onClick={() => this.props.history.push(`/`)}>
            <i className="fa fa-paw"></i>
            <h1>Happy Paws</h1>
          </div>
          <div className="header-right" onClick={() => this.props.history.push(`/cart`)}>
            <i className="fa fa-shopping-cart"></i>
          </div>
      </header>
    );
  }
}

export default Header;
