import { combineReducers } from 'redux';
import Game from './Game';
import Auth from './Auth';

const rootReducer = combineReducers({
    Game,
    Auth
});

export default rootReducer;