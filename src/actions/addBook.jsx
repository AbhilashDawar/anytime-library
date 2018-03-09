import { names } from './actionIndex.jsx';

export const addBook = (newBook) => {
    return {
        type: names.BOOK_ADDED,
        payload: newBook
    }
};