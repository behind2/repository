// import './MyComponent.css';
// import React from 'react';
//
// export default React.createClass({
//   render: function () {
//     return (
//       <div className="MyComponent-wrapper">
//         <h1>Hello world</h1>
//       </div>
//     );
//   }
// });


// 使用内联样式取代 CSS 文件
import React from 'react';

var style = {
  backgroundColor: '#EEE'
};

export default React.createClass({
  render: function () {
    return (
      <div style={style}>
        <h1>Hello world</h1>
      </div>
    );
  }
});
