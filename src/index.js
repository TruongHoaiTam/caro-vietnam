import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import './index.css';
// import Game from './App';
import Game from './containers/Game';
import Menu from './components/Menu';
import Login from './components/Login';
import Register from './components/Register';
import NotFound from './components/NotFound';
import * as serviceWorker from './serviceWorker';
import store from './redux';


ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Menu />
            <Switch>
                <Route exact path="/" component={Game} />
                <Route path="/user/login" component={Login} />
                <Route path="/user/register" component={Register} />
                <Route component={NotFound} />
            </Switch>
        </Router>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
