class AuthenticationRepository {

  handleLogin(data) {
    return fetch(
      `/login`, {
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
}

export default new AuthenticationRepository();