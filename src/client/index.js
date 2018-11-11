import React from 'react';
import { render } from 'react-dom';
import App from './app';

render(<App />, document.getElementById('app'));

// module.hot.accept('./app.js', () => {
//   const NextApp = require('./app.js').default;
//   render(<NextApp />, document.getElementById('app'));
// });
