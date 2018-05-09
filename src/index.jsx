import React from 'react';
import ReactDOM from 'react-dom';
import App from 'components/App';

import 'bootstrap/dist/css/bootstrap.min.css';
// import 'normalize.css/normalize.css';
import './styles/index.scss';

import configureStore from './store/configureStore';

// import 'assets/favicon.png';

const initialState = {};
const store = configureStore(initialState);

console.log('process.env.NODE_ENV: ', process.env.NODE_ENV);

console.time('--- Rendering to the DOM ---');
ReactDOM.render(<App store={store} />, document.getElementById('app'));
console.timeEnd('--- Rendering to the DOM ---');
