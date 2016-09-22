import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import userInfo from '../reducer/handleUserInfo';
import playInfo from '../reducer/handlePlayInfo';

let createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
let reducer = combineReducers({userInfo, playInfo});
const store = createStoreWithMiddleware(reducer);

export default store;