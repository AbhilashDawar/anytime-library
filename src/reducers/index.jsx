import {combineReducers} from 'redux';
import Users from './users.jsx';
import ActiveUser from './activeUser.jsx';

const reducers = combineReducers({
    users: Users,
    activeUser: ActiveUser
});

export default reducers;
