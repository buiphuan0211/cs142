import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import './TopBar.css';
import { Link } from 'react-router-dom';

/**
 * Define TopBar, a React componment of CS142 project #5
 */
class TopBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    localStorage.removeItem('user');
    this.props.handleAuth(null);
    window.location.href = '/';
  }
  render() {
    const user = JSON.parse(localStorage.getItem('user'));
    return (
      <AppBar className='cs142-topbar-appBar' position='absolute'>
        {/* {console.log(this.props.name)} */}
        <Toolbar>
          <Link to='/home'>Logo</Link>
          <Typography
            variant='h5'
            color='inherit'
            style={{ marginLeft: '10rem' }}
          >
            {this.props.user ? (
              <>
                <Link
                  to='/home-page'
                  style={{
                    color: 'white',
                    display: 'inline-block',
                    marginLeft: '50px',
                  }}
                >
                  hello {user?.first_name}
                </Link>
                <p
                  style={{
                    cursor: 'pointer',
                    color: 'white',
                    display: 'inline-block',
                    marginLeft: '50px',
                  }}
                  onClick={this.handleLogout}
                >
                  Đăng Xuất
                </p>
              </>
            ) : (
              <>
                <Link
                  to='/login-register'
                  style={{ color: 'white', textDecoration: 'none' }}
                >
                  Đăng nhập
                </Link>
                <Link
                  to='/register'
                  style={{
                    color: 'white',
                    textDecoration: 'none',
                    marginLeft: '20px',
                  }}
                >
                  Đăng kí
                </Link>
              </>
            )}
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

export default TopBar;
