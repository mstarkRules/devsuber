import {combineReducers} from 'redux';
import userReducer from './userReducer';
import tripReducer from './tripReducer';

export default combineReducers({
    userReducer,
    tripReducer
});