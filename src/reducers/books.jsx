import books from './books.json';
import { names } from '../actions/actionIndex.jsx';

export default (state = books, action) => {
    switch (action.type) {
        case names.BOOK_ADDED:
            return [
                ...state,
                action.book
            ];
        case names.BOOK_DELETED:
            state.map((book, index) => {
                if (book.id === action.book.id) {
                    state.splice(index, 1);
                    return;
                }
            });
            return state;
        case names.BOOK_UPDATED:
            state.map((book, index) => {
                if (book.id === action.book.id) {
                    state.splice(index, 1);
                    return;
                }
            });
            return [
                ...state,
                action.book
            ];
        case names.BOOK_AVAILABILITY_UPDATE:
            state.map(book => {
                if (book.id === action.book.id) {
                    book.libraryInfo.numberOfCopies = action.numberOfCopies;
                    book.libraryInfo.issuedTo.push({
                        user: action.user,
                        dateOfIssue: action.dateOfIssue,
                        expectedReturnDate: action.expectedReturnDate
                    });
                }
            })
            return state;
        case names.BOOK_RENEWED:
            state.map(book => {
                if (book.id === action.book.id) {
                    book.libraryInfo.issuedTo.forEach((detail) => {
                        if (detail.user.username === action.user.username) {
                            book.libraryInfo.issuedTo.expectedReturnDate = action.dateOfReturn;
                            return;
                        }
                    });
                }
            })
            return state;
        case names.BOOK_RETURN_UPDATE:
            let completeFlag = false;
            state.map(book => {
                if (book.id === action.book.id) {
                    book.libraryInfo.numberOfCopies = action.numberOfCopies;
                    book.libraryInfo.issuedTo.forEach((detail, index) => {
                        if (detail.user.username === action.user.username) {
                            book.libraryInfo.issuedHistory.push({
                                user: book.libraryInfo.issuedTo.user,
                                dateOfIssue: book.libraryInfo.issuedTo.dateOfIssue,
                                dateOfReturn: action.dateOfReturn
                            })
                            book.libraryInfo.issuedTo.splice(index, 1);
                            completeFlag = true;
                            return;
                        }
                    });
                }
                if (completeFlag) {
                    return;
                }
            })
            return state;
        case names.BOOK_REVIEWED:
            state.map(book => {
                if (book.id === action.book.id) {
                    let actionComplete = false;
                    book.libraryInfo.reviews.forEach((review,index)=>{
                        if(!actionComplete && review.user.username===action.user.username){
                            book.libraryInfo.reviews.splice(index, 1);
                            return;
                        }
                    });
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