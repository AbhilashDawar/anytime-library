import books from './books.json';
import { names } from '../actions/actionIndex.jsx';

export default (state = books, action) => {
    switch (action.type) {
        case names.BOOK_ADDED:
            return [
                ...state,
                action.payload
            ];
        case names.BOOK_AVAILABILITY_UPDATE:
            state.map(book => {
                if (book.id === action.book.id) {
                    book.libraryInfo.numberOfCoppies = action.numberOfCopies;
                    book.libraryInfo.issuedTo.push({
                        user: action.user,
                        dateOfIssue: action.dateOfIssue
                    });
                }
            })
            return state;
        case names.BOOK_RETURN_UPDATE:
            let completeFlag = false;
            state.map(book => {
                if (book.id === action.book.id) {
                    book.libraryInfo.numberOfCoppies = action.numberOfCopies;
                    book.libraryInfo.issuedTo.forEach((user, index) => {
                        if (user.username === action.user.username) {
                            book.libraryInfo.issuedHistory.push({
                                user: book.libraryInfo.issuedTo.user,
                                dateOfIssue: book.libraryInfo.issuedTo.dateOfIssue,
                                dateOfReturn: action.dateOfReturn
                            })
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
        case names.BOOK_REVIEWED:
            state.map(book => {
                if (book.id === action.book.id) {
                    book.libraryInfo.reviews.push({
                        user: action.user,
                        comments: action.review.comments,
                        rating: action.review.rating
                    })
                    let oldRating = JSON.parse(JSON.stringify(book.volumeInfo.averageRating));
                    let oldRatingCount = JSON.parse(JSON.stringify(book.volumeInfo.ratingsCount));
                    let newRatingCount = JSON.parse(JSON.stringify(book.volumeInfo.ratingsCount));
                    newRatingCount++;
                    book.volumeInfo.averageRating = ((oldRating * oldRatingCount) + action.review.rating) / newRatingCount;
                    book.volumeInfo.ratingsCount = newRatingCount;
                }
            });
            return state;
        default:
            return state;
    }
}