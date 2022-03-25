/* eslint-disable class-methods-use-this */
import { Grid, Paper } from '@material-ui/core';
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';
import HomePage from './components/HomePage';
import Login from './components/Login';
import Register from './components/Register';
// import necessary components
import TopBar from './components/topBar/TopBar';
import UserDetail from './components/userDetail/userDetail';
import UserList from './components/userList/userList';
import UserPhotos from './components/userPhotos/userPhotos';
import './styles/main.css';

class PhotoShare extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      userLocalStorge: JSON.parse(localStorage.getItem('user')) || null,
    };
    this.handleAuth = this.handleAuth.bind(this);
  }

  callbackFunction = (item) => {
    this.setState({ user: item });
  };

  handleAuth(data) {
    this.setState({ userLocalStorge: data });
  }

  render() {
    return (
      <HashRouter>
        <div>
          <Grid container spacing={8}>
            <Grid item xs={12}>
              <TopBar
                user={this.state.userLocalStorge}
                handleAuth={this.handleAuth}
              />
            </Grid>
            <div className='cs142-main-topbar-buffer' />
            {!this.state.userLocalStorge ? (
              <Switch>
                <Route
                  path='/login-register'
                  render={(props) => (
                    <Login {...props} handleAuth={this.handleAuth} />
                  )}
                />
                <Route
                  path='/register'
                  render={(props) => (
                    <Register {...props} handleAuth={this.handleAuth} />
                  )}
                />
              </Switch>
            ) : (
              <>
                <Grid item sm={3}>
                  <Paper className='cs142-main-grid-item'>
                    <UserList parentCallback={this.callbackFunction} />
                  </Paper>
                </Grid>
                <Grid item sm={9}>
                  <Paper className='cs142-main-grid-item'>
                    <Switch>
                      <Route path='/home-page' component={HomePage} />
                      <Route
                        path='/users/:userId'
                        render={(props) => <UserDetail {...props} />}
                      />
                      <Route
                        path='/photos/:userId'
                        render={(props) => <UserPhotos {...props} />}
                      />
                      <Route path='/users' component={UserList} />
                    </Switch>
                  </Paper>
                </Grid>
              </>
            )}
          </Grid>
        </div>
      </HashRouter>
    );
  }
}

ReactDOM.render(<PhotoShare />, document.getElementById('photoshareapp'));
