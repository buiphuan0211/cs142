import React from 'react';
import './userDetail.css';

/**
 * Define UserDetail, a React componment of CS142 project #5
 */
class UserDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const user = window.cs142models.userModel(this.props.match.params.userId);
    const info = [];

    for (const key in user) {
      info.push(`${key}: ${user[key]}`);
    }

    return (
      <ul>
        {info.map((el) => (
          <li key={el}>{el}</li>
        ))}
      </ul>
    );
  }
}

export default UserDetail;
