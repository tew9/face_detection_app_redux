import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import './index.css';
import App from './containers/App';
import 'tachyons';
import * as serviceWorker from './serviceWorker';
import { changeFields } from './containers/app_reducer.js';

//creating action tracker logger for debugging.
//const logger = createLogger();

//creating store
const store = createStore(changeFields) //applyMiddleware(logger))

ReactDOM.render(
            <Provider store = { store }>
                <App />
            </Provider>,
            document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
