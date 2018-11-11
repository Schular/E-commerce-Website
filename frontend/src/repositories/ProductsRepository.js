class ProductsRepository {

  getPagesNumber() {
    return fetch(`/products/pages`)
      .then(response => response.json())
      .then(result => result)
      .catch(err => console.log(err));
  }

  getProductDataById(id) {
    return fetch(`/product/${id}`)
      .then(response => response.json())
      .then(result => result)
      .catch(err => console.log(err));
  }

  getProductsBySortByPage(sortBy, page) {
    return fetch(`/products/${sortBy}/${page}`)
      .then(response => response.json())
      .then(result => result)
      .catch(err => console.log(err));
  }

  addProduct(data) {
    return fetch(
      '/product', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(result => result)
      .catch(err => console.log(err));
  }

  editProduct(data) {
    return fetch(
      `/product/${data.id}`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "PUT",
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(result => result)
      .catch(err => console.log(err));
  }

  deleteProduct(id) {
    return fetch(
      `/product/${id}`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "DELETE",
        body: JSON.stringify({id: id})
      })
      .then(response => response.json())
      .then(result => result)
      .catch(err => console.log(err));
  }
}

export default new ProductsRepository();