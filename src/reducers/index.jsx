import {combineReducers} from 'redux';
import Users from './users.jsx';
import ActiveUser from './activeUser.jsx';
import Books from './books.jsx';
import SelectedBook from './selectedBook.jsx';
import BookAction from './bookAction.jsx';

const reducers = combineReducers({
    users: Users,
    activeUser: ActiveUser,
    books: Books,
    selectedBook: SelectedBook,
    addingBook: BookAction
});

export default reducers;
