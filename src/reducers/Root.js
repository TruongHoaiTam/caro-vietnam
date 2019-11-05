import { combineReducers } from 'redux';
import Game from './Game';
import GameOnline from './GameOnline';
import Auth from './Auth';

const rootReducer = combineReducers({
    Game,
    GameOnline,
    Auth
});

export default rootReducer;