import React, { Component } from 'react';
import './App.css';
import Products from './components/products/products';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Products />
      </div>
    );
  }
}

export default App;
