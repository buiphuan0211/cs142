import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/header/Header';
import PageChange from './components/pageChange/PageChange';

ReactDOM.render(
  <div>
    <Header title='Day la header cua P4' />
    <PageChange /> 
  </div>,
  document.getElementById('reactapp')
);
