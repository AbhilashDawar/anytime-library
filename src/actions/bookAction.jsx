import { names } from './actionIndex.jsx';

export const bookAction = (value) => {
    return {
        type: names.BOOK_ACTION,
        payload: value
    }
};