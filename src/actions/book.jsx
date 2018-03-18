import { names } from './actionIndex.jsx';

export const addBook = (newBook) => {
    return {
        type: names.BOOK_ADDED,
        book: newBook
    }
};

export const deleteBook = (book) => {
    return {
        type: names.BOOK_DELETED,
        book: book
    }
};

export const updateBook = (book) => {
    return {
        type: names.BOOK_UPDATED,
        book: book
    }
};