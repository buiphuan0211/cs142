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
  }

  render() {
    return (
      <div>
        <List component='nav'>
          {window.cs142models.userListModel().map((user) => (
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
