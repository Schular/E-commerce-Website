import React, { Component } from 'react';
import Sort from '../sort/sort';
import Pagination from "../pagination/pagination";
import './products.css';

class Products extends Component {
	constructor() {
    super();
    this.state = {
      products: [],
      currPage: 1,
      pages: 0
    };

    this.handleProductsOrdering = this.handleProductsOrdering.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  handlePageChange(target) {
    const SELECT = document.querySelector('#sort-by');
    let page = target.dataset.value;
    
    switch (page) {
      case '<' :
        this.setState({currPage: this.state.currPage - 1}, () => this.handleProductsOrdering(SELECT, this.state.currPage)); break;
      case '>' :
        this.setState({currPage: this.state.currPage + 1}, () => this.handleProductsOrdering(SELECT, this.state.currPage)); break;
      default : {
        page = parseInt(page);
        
        this.setState({currPage: page}, this.handleProductsOrdering(SELECT, page));
      }
    }
  }

  handleProductsOrdering(target, page = this.state.currPage) {
    fetch(`/products/${target.value}/${page}`)
      .then(res=>res.json())
      .then(products => this.setState({products}));
  }

  componentDidMount() {
    fetch(`/products/name-ascending/1`)
      .then(res=>res.json())
      .then(products => this.setState({products}));
  
    fetch('/products/pages')
      .then(res => res.json())
      .then(pages => this.setState({pages}));
  }

  render() {
    return (
      <div className="products-container">
        <h1>Products</h1>
        <Sort handleProductsOrdering={this.handleProductsOrdering}/>
        {this.state.products[0] ? 
          (
            <ul className="products-grid">
              {this.state.products.map(product =>
                <li className="product-item" key={product.id}>
                  <h1>{product.name}</h1>
                  <div className="products-bottom">Price: {product.price}€</div>
                </li>
              )}
            </ul>
          ) : <h1>Error while trying to load the products!</h1>
        }
        <Pagination handlePageChange={this.handlePageChange} currPage={this.state.currPage}/>
      </div>
    );
  }
}

export default Products;
