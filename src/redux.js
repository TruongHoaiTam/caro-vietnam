import { createStore, combineReducers } from 'redux';
import { history } from './reducers/history'
import { stepNumber } from './reducers/stepNumber'
import { reverse } from './reducers/reverse'
import { xIsNext } from './reducers/xIsNext'


const appReducers = combineReducers({
    history,
    stepNumber,
    xIsNext,
    reverse
})

const store = createStore(appReducers);

export default store;