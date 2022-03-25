import React from 'react';
import './userDetail.css';

/**
 * Define UserDetail, a React componment of CS142 project #5
 */
class UserDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
  }

  componentDidMount = () => {
    console.log('>> Component Did Mount');
    let userID = this.props.match.params.userId;
    fetch(`http://localhost:3000/user/${userID}`)
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          this.setState({
            user: result,
          });
        },
        (error) => {
          console.log('BUG CALL API');
        }
      );
  };

  render() {
    const info = [];

    for (const key in this.state.user) {
      info.push(`${key}: ${this.state.user[key]}`);
    }

    return (
      <div>
        <ul>
          {info.map((el) => (
            <li key={el}>{el}</li>
          ))}
        </ul>
        <button onClick={() => this.props.history.goBack()}>
          Về trang trước nè
        </button>
      </div>
    );
  }
}

export default UserDetail;
