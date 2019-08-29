import React from 'react';
import ReactDOM from 'react-dom';
import Event from './Event'
const title = 'event';

ReactDOM.render(
  <Event/>,
  document.getElementById('app')
);

module.hot.accept();
