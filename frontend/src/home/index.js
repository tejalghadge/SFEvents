import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Home';
import 'antd/dist/antd.css';

const title = 'Home';

ReactDOM.render(
  <Home/>,
  document.getElementById('app')
);

module.hot.accept();