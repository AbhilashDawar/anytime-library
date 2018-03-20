import { names } from '../actions/actionIndex.jsx';

let users = [
    {
        username: "admin",
        password: "admin",
        type: "ADMIN",
        givenName: "Admin",
        familyName: "The Super Boss",
        isGoogleUser: true
    },
    {
        username: "testUser",
        password: "testUser",
        type: "USER",
        givenName: "Test User",
        familyName: "1",
        imageUrl: "https://image.flaticon.com/icons/svg/16/16480.svg",
        issuedBooks: [],
        favoriteGenre: [],
        isGoogleUser: false
    },
    {
        username: "user",
        password: "user",
        type: "USER",
        givenName: "Test",
        familyName: "User 2",
        imageUrl: "https://image.flaticon.com/icons/svg/16/16480.svg",
        issuedBooks: [],
        favoriteGenre: [],
        isGoogleUser: false
    }
];

export default (state = users, action) => {
    switch (action.type) {
        case names.NEW_USER:
            return [
                ...state,
                action.payload
            ];
        case names.BOOK_ISSUED:
            // eslint-disable-next-line
            state.map(user => {
                if (user.username === action.user.username) {
                    user.issuedBooks.push({
                        id: action.book.id,
                        dateOfIssue: action.dateOfIssue,
                        dateOfReturn: action.dateOfReturn,
                        renewed: false
                    })
                }
            })
            return state;
        case names.BOOK_RENEWED:
            // eslint-disable-next-line
            state.map(user => {
                if (user.username === action.user.username) {
                    user.issuedBooks.forEach((book) => {
                        if (book.id === action.book.id) {
                            book.dateOfReturn = action.dateOfReturn;
                            book.renewed = true;
                        }
                    })
                }
            })
            return state;
        case names.BOOK_RETURNED:
            let completeFlag = false;
            // eslint-disable-next-line
            state.map(user => {
                if (user.username === action.user.username) {
                    user.issuedBooks.forEach((detail, index) => {
                        if (detail.id === action.book.id) {
                            user.issuedBooks.splice(index, 1);
                            completeFlag = true;
                            return;
                        }
                    })
                    if (completeFlag) {
                        // eslint-disable-next-line
                        return;
                    }
                }
            })
            return state;
        case names.USER_PROFILE_SAVED:
            // eslint-disable-next-line
            state.map(user => {
                if (user.username === action.user.username) {
                    user.favoriteGenre = action.user.favoriteGenre;
                    // eslint-disable-next-line
                    return;
                }
            });
            return state;
        default:
            return state;
    }
}
