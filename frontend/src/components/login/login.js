import React, { Component } from 'react';
import AuthenticationRepository from '../../repositories/AuthenticationRepository';
import Toastr from 'toastr/toastr';
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
    if (user.confirmPassword === user.password) {
      AuthenticationRepository.handleLogin(user)
        .then(response => {
          if (response.error) {
            document.querySelector('.form-errors').innerText = response.error;
            setTimeout(() => document.querySelector('.form-errors').innerText = '', 2000);
          } else {
            Toastr.success('You have successfully logged in!', 'Success!', { timeOut: 3000 })
            this.props.setAdmin(response.admin);
            this.props.history.push(`/`);
          }
        })
        .catch((e) => console.log(e));
    } else {
      document.querySelector('.form-errors').innerText = 'Passwords must match!';
      setTimeout(() => document.querySelector('.form-errors').innerText = '', 2000);
    }
  }

  render() {
    return (
      <div className="login-container">
        <h1>Login</h1>
        <div className="login-form">
          <div className="form-errors"></div>
          <form onSubmit={(e) => this.login(e)}>
            <input type="text" name="email" placeholder="Email" required />
            <input type="password" name="password" placeholder="Password" required />
            <input type="password" name="confirmPassword" placeholder="Confirm Password" required />
            <button type="submit" className="login-button">Login</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
