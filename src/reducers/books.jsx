import books from './books.json';
import { names } from '../actions/actionIndex.jsx';

export default (state = books, action) => {
    switch (action.type) {
        case names.BOOK_ADDED:
            return [
                ...state,
                action.payload
            ];
            break;
        case names.BOOK_AVAILABILITY_UPDATE:
            state.map(book => {
                if (book.id === action.book.id) {
                    book.libraryInfo.numberOfCoppies = action.numberOfCopies;
                    book.libraryInfo.issuedTo.push(action.user);
                }
            })
            return state;
            break;
        case names.BOOK_RETURN_UPDATE:
        // TODDO history to be updated
            let completeFlag = false;
            state.map(book => {
                if (book.id === action.book.id) {
                    book.libraryInfo.numberOfCoppies = action.numberOfCopies;
                    book.libraryInfo.issuedTo.forEach((user, index) => {
                        if (user.username === action.user.username) {
                            book.libraryInfo.issuedTo.splice(index, 1);
                            completeFlag = true;
                            return;
                        }
                    })
                }
                if (completeFlag) {
                    return;
                }
            })
            return state;
            break;
        default:
            return state;
    }
}