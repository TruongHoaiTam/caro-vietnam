import { Provider } from 'react-redux';
import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import '../index.css';
// import Menu from './Menu';
import Home from '../containers/Home';
import Game from '../containers/Game';
import Login from '../containers/Login';
import Register from './Register';
import Update from '../containers/Update';
import NotFound from './NotFound';

const Root = ({ store }) => (
    <Provider store={store}>
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/game" component={Game} />
                <Route path="/user/login" component={Login} />
                <Route path="/user/register" component={Register} />
                <Route path="/user/update" component={Update} />
                <Route component={NotFound} />
            </Switch>
        </Router>
    </Provider>
);

export default Root;