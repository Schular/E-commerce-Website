import React, { Component } from 'react';
import './pagination.css';

class Pagination extends Component {
  constructor() {
    super();
    this.state = {
      pages: []
    };
  }

  generatePages(numPages) {
    let pages = [];

    for(let i = 0; i < numPages; i++) {
      pages[i] = i + 1;
    }

    this.setState({pages});
    return pages;
  }

  componentDidMount() {
    fetch('/products/pages')
      .then(res => res.json())
      .then(numPages => this.generatePages(numPages));
  }

  render() {
    const { currPage, handlePageChange } = this.props;
    return (
      <div className='pagination'>
        {this.state.pages.length ? 
          (
            <ul>
              {currPage !== 1 ? 
                <li className='page page-left' onClick={(e) => handlePageChange(e.target)} data-value={'<'}>{'<<'}</li> :
                <li className='page page-left page-hidden'>{'<<'}</li>
              }
              {this.state.pages.map(page =>
                  page === currPage ?
                    <li className='page selected' onClick={(e) => handlePageChange(e.target)} key={page} data-value={page}>{page}</li> :
                    <li className='page' onClick={(e) => handlePageChange(e.target)} key={page} data-value={page}>{page}</li>
              )}
              {currPage !== this.state.pages.length ? 
                <li className='page page-right' onClick={(e) => handlePageChange(e.target)} data-value={'>'}>{'>>'}</li> :
                <li className='page page-right page-hidden'>{'>>'}</li>
              }
            </ul>
          ) : <h4>Something went wrong while trying to load the pages!</h4>
        }
      </div>
    );
  }
}

export default Pagination;