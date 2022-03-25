import React from 'react';
import { Divider, List, ListItem } from '@material-ui/core';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './userList.css';

/**
 * Define UserList, a React componment of CS142 project #5
 */
class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }

  componentDidMount = () => {
    axios.get(`http://localhost:3000/user/list`).then((res) => {
      const result = res.data;
      this.setState({ users: result.data.users });
    });
  };

  render() {
    const userLogin = JSON.parse(localStorage.getItem('user'));
    const listUser = this.state.users.filter(
      (user) => user._id !== userLogin._id
    );
    return (
      <div>
        <List component='nav'>
          {listUser.map((user) => (
            <div key={user._id}>
              <ListItem>
                <Link to={`/users/${user._id}`} style={{ cursor: 'pointer' }}>
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
