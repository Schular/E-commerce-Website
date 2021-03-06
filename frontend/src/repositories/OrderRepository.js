class OrderRepository {

  sendOrder(data) {
    return fetch(
      '/orders', {
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

  getOrders() {
    return fetch('/orders')
      .then(response => response.json())
      .then(result => result)
      .catch(err => console.log(err));
  }
}

export default new OrderRepository();