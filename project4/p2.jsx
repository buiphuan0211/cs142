import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/header/Header';

import States from './components/states/States';

ReactDOM.render(
  <div>
    <Header title='Header của trang P2' />
    <States />
  </div>,
  document.getElementById('reactapp')
);
