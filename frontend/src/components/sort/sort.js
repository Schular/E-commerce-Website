import React, { Component } from 'react';
import './sort.css';

class Sort extends Component {
  render() {
    return (
      <div>
        <label htmlFor="sort-by">Sort by</label>
        <select id="sort-by" onChange={(e) => this.props.handleProductsOrdering(e.target)}>
          <option value="name-ascending">Name: Ascending</option>
          <option value="name-descending">Name: Descending</option>
          <option value="price-ascending">Price: Ascending</option>
          <option value="price-descending">Price: Descending</option>
        </select>
      </div>
    );
  }
}

export default Sort;
