import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

//render into the root div on index.html
//with most apps you give the top level component here and you only do this once
ReactDOM.render(<App />, document.getElementById('root'));