import React from 'react';
import axios from 'axios';
import './Register.css';

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      location: '',
      description: '',
      occupation: '',
      errorMessageRegister: {
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        location: '',
        description: '',
        occupation: '',
      },
      errorSubmit: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmitRegister = this.handleSubmitRegister.bind(this);
  }

  handleInputChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value });

    if (!value) {
      this.setState({
        errorMessageRegister: {
          ...this.state.errorMessageRegister,
          [name]: `${name} không được để trống`,
        },
      });
    } else {
      this.setState({
        errorMessageRegister: {
          ...this.state.errorMessageRegister,
          [name]: '',
        },
      });
    }
  }

  handleSubmitRegister(e) {
    e.preventDefault();
    const {
      username,
      password,
      firstName,
      lastName,
      location,
      description,
      occupation,
    } = this.state;

    axios
      .post(`http://localhost:3000/user`, {
        username,
        password,
        first_name: firstName,
        last_name: lastName,
        location,
        description,
        occupation,
      })
      .then((res) => {
        localStorage.setItem('user', JSON.stringify(res.data.data.user));
        this.props.handleAuth(res.data.data.user);
        this.props.history.push('/');
      })
      .catch((err) => {
        console.log(err.response);
        this.setState({ errorSubmit: err.response.data.message });
      });

    this.props.history.push({
      pathname: `/home-page`,
    });
  }

  render() {
    return (
      <div style={{ marginTop: '50px', marginLeft: '50px' }}>
        <h2>Đăng kí</h2>
        <form onSubmit={this.handleSubmitRegister}>
          <div>
            <label htmlFor='username'>username</label>
            <input
              type='text'
              name='username'
              value={this.state.username}
              onChange={this.handleInputChange}
            />
            <p style={{ color: 'red' }}>
              {this.state.errorMessageRegister.username}
            </p>
          </div>

          <div>
            <label htmlFor='password'>password</label>
            <input
              type='text'
              name='password'
              value={this.state.password}
              onChange={this.handleInputChange}
            />
            <p style={{ color: 'red' }}>
              {this.state.errorMessageRegister.password}
            </p>
          </div>

          <div>
            <label htmlFor='firstName'>firstName</label>
            <input
              type='text'
              name='firstName'
              value={this.state.firstName}
              onChange={this.handleInputChange}
            />{' '}
            <p style={{ color: 'red' }}>
              {this.state.errorMessageRegister.firstName}
            </p>
          </div>

          <div>
            <label htmlFor='lastName'>Last name</label>
            <input
              type='text'
              name='lastName'
              value={this.state.lastName}
              onChange={this.handleInputChange}
            />{' '}
            <p style={{ color: 'red' }}>
              {this.state.errorMessageRegister.lastName}
            </p>
          </div>

          <div>
            <label htmlFor='location'>Location</label>
            <input
              type='text'
              name='location'
              value={this.state.location}
              onChange={this.handleInputChange}
            />{' '}
            <p style={{ color: 'red' }}>
              {this.state.errorMessageRegister.location}
            </p>
          </div>

          <div>
            <label htmlFor='description'>Description</label>
            <input
              type='text'
              name='description'
              value={this.state.description}
              onChange={this.handleInputChange}
            />{' '}
            <p style={{ color: 'red' }}>
              {this.state.errorMessageRegister.description}
            </p>
          </div>

          <div>
            <label htmlFor='occupation'>Occupation</label>
            <input
              type='text'
              name='occupation'
              value={this.state.occupation}
              onChange={this.handleInputChange}
            />
            <p style={{ color: 'red' }}>
              {this.state.errorMessageRegister.occupation}
            </p>
          </div>
          <button type='submit'>submit</button>
        </form>
        {this.state.errorSubmit && (
          <b style={{ color: 'red' }}>{this.state.errorSubmit}</b>
        )}
      </div>
    );
  }
}

export default Register;
