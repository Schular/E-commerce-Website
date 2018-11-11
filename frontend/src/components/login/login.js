import React, { Component } from 'react';
import AuthenticationRepository from '../../repositories/AuthenticationRepository';
import './login.css';

class Login extends Component {
  login(e) {
    const form = new FormData(document.querySelector('form'));
    const user = {
        email: form.get('email'),
        password: form.get('password'),
        confirmPassword: form.get('confirmPassword'),
    }

    e.preventDefault();
    if (user.confirmPassword === user.password ) {
      AuthenticationRepository.handleLogin(user)
        .then(response => {
          this.props.setAdmin(response.admin);
          this.props.history.push(`/`);
        })
        .catch((e) => console.log(e));
    } else {
      console.log('Password must match.');
    }
  }

  render() {
    return (
      <div className="login-container">
        <h1>Login</h1>
        <div className="login-form">
          <form onSubmit={(e) => this.login(e)}>
            <input type="text" name="email" placeholder="Email" minLength="6" required />
            <input type="password" name="password" placeholder="Password" minLength="6" required />
            <input type="password" name="confirmPassword" placeholder="Confirm Password" minLength="6" required />
            <button type="submit" className="login-button">Login</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
