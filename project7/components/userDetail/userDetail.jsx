import React from 'react';
import axios from 'axios';
import './userDetail.css';
import { Link } from 'react-router-dom';

/**
 * Define UserDetail, a React componment of CS142 project #5
 */
class UserDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      userId: this.props.match.params.userId || 0,
    };
  }

  componentDidMount = () => {
    // console.log('>> Component Did Mount');
    let userID = this.props.match.params.userId;
    axios.get(`http://localhost:3000/user/${userID}`).then((res) => {
      const result = res.data;
      this.setState({ user: result.data.user });
    });
  };

  componentDidUpdate = () => {
    // console.log('>> Component Did Update');
    let newUserID = this.props.match.params.userId;
    if (this.state.userId !== newUserID) {
      axios.get(`http://localhost:3000/user/${newUserID}`).then((res) => {
        const result = res.data;
        this.setState({ user: result.data.user, userId: newUserID });
      });
    }
  };

  render() {
    return (
      <div>
        <ul>
          <li>id: {this.state.user._id}</li>
          <li>firstName: {this.state.user.first_name}</li>
          <li>lastName: {this.state.user.last_name}</li>
          <li>Location: {this.state.user.location}</li>
          <li>Description: {this.state.user.description}</li>
        </ul>
        <Link
          to={`/photos/${this.state.user._id}`}
          style={{ cursor: 'pointer' }}
        >
          Photo
        </Link>
        {/* <button onClick={() => this.props.history.goBack()}>
          Về trang trước nè
        </button> */}
      </div>
    );
  }
}

export default UserDetail;
