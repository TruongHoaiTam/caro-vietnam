import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import rootReducer from './reducers/Root';
import Root from './components/Root';
import './index.css';

const redux = require('redux');

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || redux.compose;
const store = redux.createStore(
    rootReducer,
    composeEnhancer(redux.applyMiddleware(thunk))
);
store.subscribe(() => console.log(store.getState()));

ReactDOM.render(<Root store={store} />, document.getElementById('root'));