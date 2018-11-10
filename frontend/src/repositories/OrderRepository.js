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
      }
    )
      .then(response => {
        return response.json();
      })
      .then(result => {
        return result;
      })
      .catch(err => console.log(err));
  }
}

export default new OrderRepository();