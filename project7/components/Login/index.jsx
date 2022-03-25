// @ts-nocheck
import React from 'react';
import axios from 'axios';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errorMessageLogin: {
        username: '',
        password: '',
      },
      errorSubmit: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmitLogin = this.handleSubmitLogin.bind(this);
  }

  handleInputChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value });

    if (!value) {
      this.setState({
        errorMessageLogin: {
          ...this.state.errorMessageLogin,
          [name]: `${name} không được để trống`,
        },
      });
    } else {
      this.setState({
        errorMessageLogin: {
          ...this.state.errorMessageLogin,
          [name]: '',
        },
      });
    }
  }

  handleSubmitLogin(e) {
    e.preventDefault();
    axios
      .post(`http://localhost:3000/admin/login`, {
        username: this.state.username,
        password: this.state.password,
      })
      .then((res) => {
        localStorage.setItem('user', JSON.stringify(res.data.user));
        this.props.handleAuth(res.data.user);
        this.props.history.push({
          pathname: `/home-page`, 
        });
      })
      .catch((err) => {
        console.log(err.response);
        this.setState({ errorSubmit: err.response.data.message });
      });
  }

  render() {
    return (
      <div style={{ marginTop: '50px', marginLeft: '50px' }}>
        <h2>Đăng nhập</h2>
        <form onSubmit={this.handleSubmitLogin}>
          <label>
            username:
            <input
              type='text'
              name='username'
              value={this.state.username}
              onChange={this.handleInputChange}
            />
          </label>
          <p style={{ color: 'red' }}>
            {this.state.errorMessageLogin.username}
          </p>
          <label>
            password:
            <input
              type='text'
              name='password'
              value={this.state.password}
              onChange={this.handleInputChange}
            />
          </label>
          <b style={{ color: 'red' }}>
            {this.state.errorMessageLogin.password}
          </b>
          <button type='submit'>Submit</button>
        </form>
        {this.state.errorMessageLogin && (
          <b style={{ color: 'red' }}>{this.state.errorSubmit}</b>
        )}
      </div>
    );
  }
}

export default Login;
