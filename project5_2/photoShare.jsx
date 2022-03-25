import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { Grid, Typography, Paper } from '@material-ui/core';
import './styles/main.css';

// import necessary components
import TopBar from './components/topBar/TopBar';
import UserDetail from './components/userDetail/userDetail';
import UserList from './components/userList/userList';
import UserPhotos from './components/userPhotos/userPhotos';
import { BrowserRouter } from 'react-router-dom';

class PhotoShare extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
  }

  callbackFunction = (item) => {
    this.setState({ user: item });
  };

  render() {
    return (
      <BrowserRouter>
        {console.log(this.state.user)}
        <div>
          <Grid container spacing={8}>
            <Grid item xs={12}>
              <TopBar name={this.state.user.first_name} photoOf='no' />
            </Grid>
            <div className='cs142-main-topbar-buffer' />
            <Grid item sm={3}>
              <Paper className='cs142-main-grid-item'>
                <UserList parentCallback={this.callbackFunction} />
              </Paper>
            </Grid>
            <Grid item sm={9}>
              <Paper className='cs142-main-grid-item'>
                <Switch>
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
          </Grid>
        </div>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<PhotoShare />, document.getElementById('photoshareapp'));
