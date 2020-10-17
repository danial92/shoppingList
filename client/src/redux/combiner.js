import { combineReducers } from 'redux';
import itemReducer from './reducers/itemReducer';
import errorReducer from './reducers/errorReducer';
import authReducer from './reducers/authReducer';

export default combineReducers({
    item: itemReducer,
    error: errorReducer,
    auth: authReducer
})