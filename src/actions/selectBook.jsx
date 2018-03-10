import { names } from './actionIndex.jsx';

export const selectBook = (book) => {
    return {
        type: names.BOOK_SELECTED,
        payload: book
    }
};