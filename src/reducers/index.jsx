import {combineReducers} from 'redux';
import Users from './users';

const reducers = combineReducers({
    users: Users
});

export default reducers;
