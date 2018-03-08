// import 'babel-polyfill';
// import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import App from 'containers/App';
import configureStore from 'store/configureStore';
import { loadState, saveState } from 'utils/localStorage';

import 'normalize.css/normalize.css';
import 'styles/index.scss';

import 'assets/favicon-32x32.png';

const initialState = {};
const persistedState = loadState('app-state') || {};

// const store = configureStore(persistedState);
const store = configureStore(initialState);

// store.subscribe(() => console.log('New state from store: ', store.getState()));

console.log('process.env.NODE_ENV: ', process.env.NODE_ENV);

console.time('--- Start rendering to the DOM ---');
ReactDOM.render(<App store={store} />, document.getElementById('app'));
console.timeEnd('--- Finish rendering to the DOM ---');