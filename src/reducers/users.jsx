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
        username: "test",
        password: "test",
        type: "USER",
        givenName: "Test",
        familyName: "User",
        issuedBooks: [],
        isGoogleUser: true
    },
    {
        username: "user",
        password: "user",
        type: "USER",
        givenName: "Test",
        familyName: "User 2",
        issuedBooks: [],
        isGoogleUser: true
    }
];

export default (state = users, action) => {
    switch (action.type) {
        case names.NEW_USER:
            return [
                ...state,
                action.payload
            ];
            break;
        case names.BOOK_ISSUED:
            state.map(user => {
                if (user.username === action.user.username) {
                    user.issuedBooks.push({
                        id: action.book.id,
                        dateOfIssue: action.dateOfIssue,
                        dateOfReturn: action.dateOfReturn
                    })
                }
            })
            return state;
            break;
        case names.BOOK_RETURNED:
            let completeFlag = false;
            state.map(user => {
                if (user.username === action.user.username) {
                    user.issuedBooks.forEach((detail, index) => {
                        if (detail.id === action.book.id) {
                            user.issuedBooks.splice(index, 1);
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
