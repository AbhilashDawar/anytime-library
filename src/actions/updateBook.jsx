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

export const renewBook = (book, user, dateOfReturn) => {
    return {
        type: names.BOOK_RENEWED,
        book,
        user,
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

export const reviewBook = (book, user, review) => {
    return {
        type: names.BOOK_REVIEWED,
        book,
        user,
        review
    }
};

export const updateBookAvailability = (book, user, numberOfCopies, dateOfIssue, expectedReturnDate) => {
    return {
        type: names.BOOK_AVAILABILITY_UPDATE,
        book,
        user,
        dateOfIssue,
        expectedReturnDate,
        numberOfCopies
    }
};

export const updateBookAvailabilityOnReturn = (book, user, numberOfCopies, dateOfReturn) => {
    return {
        type: names.BOOK_RETURN_UPDATE,
        book,
        user,
        dateOfReturn,
        numberOfCopies
    }
};