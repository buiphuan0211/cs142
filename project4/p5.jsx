import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Link } from 'react-router-dom';
import Example from './components/example/Example';
import Header from './components/header/Header';
import States from './components/states/States';

ReactDOM.render(
  <div>
    <Header />
    <HashRouter>
      <div>
        <div>
          <Link className='view-button' to='/states'>
            States
          </Link>
          <Link className='view-button' to='/example'>
            Example
          </Link>
        </div>
        <Route path='/states' component={States}></Route>
        <Route path='/example' component={Example}></Route>
      </div>
    </HashRouter>
  </div>,
  document.getElementById('reactapp')
);
