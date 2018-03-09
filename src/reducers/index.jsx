import {combineReducers} from 'redux';
import Users from './users.jsx';
import ActiveUser from './activeUser.jsx';
import Books from './books.jsx';

const reducers = combineReducers({
    users: Users,
    activeUser: ActiveUser,
    books: Books
});

export default reducers;
