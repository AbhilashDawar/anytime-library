import { names } from './actionIndex.jsx';

export const issueBook = (book, user, dateOfIssue, dateOfReturn) => {
    return {
        type: names.BOOK_ISSUED,
        book,
        user,
        dateOfIssue,
        dateOfReturn
    }
};

export const returnBook = (book, user, dateOfReturn) => {
    return {
        type: names.BOOK_RETURNED,
        book,
        user,
        dateOfReturn
    }
};

export const updateBookAvailability = (book, user, numberOfCopies) => {
    return {
        type: names.BOOK_AVAILABILITY_UPDATE,
        book,
        user,
        numberOfCopies
    }
};

export const updateBookAvailabilityOnReturn = (book, user, numberOfCopies) => {
    return {
        type: names.BOOK_RETURN_UPDATE,
        book,
        user,
        numberOfCopies
    }
};