import books from './books.json';
import { names } from '../actions/actionIndex.jsx';

export default (state = null, action) => {
    if (action.type === names.BOOK_ADDED) {
        books.push(action.payload);
        return books;
    } else {
        return books;
    }
}