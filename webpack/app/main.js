'use strict';

// var component = require('./component.js');
//
// document.body.appendChild(component());

import React from 'react';
import Hello from './component';
// import './main.css';
// Other code
// 所有合成一个
// import './project-style.css';
// 懒加载
import '.style.css';

var main = function () {
  React.render(<Hello />, document.getElementById('app'));
};
