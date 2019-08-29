import React from 'react';
import ReactDOM from 'react-dom';
import Event from './Event';
import 'antd/dist/antd.css';

const title = 'management';

ReactDOM.render(

  <Event/>,
  document.getElementById('app')
);

module.hot.accept();