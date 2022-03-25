import React from 'react';
import { Divider, List, ListItem } from '@material-ui/core';
import './userList.css';
import { Link } from 'react-router-dom';

/**
 * Define UserList, a React componment of CS142 project #5
 */
class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
    // let prom = fetchModel(`http://localhost:3000/user/list`);
    // prom.then((response) => {
    //   this.setState({ users: response.data });
    // });
  }

  componentDidMount = () => {
    console.log('>> Component Did Mount');
    fetch('http://localhost:3000/user/list')
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({ users: result });
        },
        (error) => {
          console.log('BUG CALL API');
        }
      );
  };

  render() {
    console.log(this.state.users);
    console.log('>> Render');
    return (
      <div>
        <List component='nav'>
          {this.state.users.map((user) => (
            <div key={user._id}>
              <ListItem>
                {/* <Link to={`/users/${user._id}`} style={{ cursor: 'pointer' }}> */}
                <Link to={`/photos/${user._id}`} style={{ cursor: 'pointer' }}>
                  {user.first_name}
                </Link>
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
      </div>
    );
  }
}

export default UserList;
