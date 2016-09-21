import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import data from '../reducer/handleInitData';
import timerInfo from '../reducer/handleTimerPlay';

let createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
let reducer = combineReducers({data, timerInfo});
const store = createStoreWithMiddleware(reducer);

export default store;