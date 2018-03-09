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

export default (state = null, action) => {
    if (action.type === names.USER_LOGGED_IN) {
        users.push(action.payload);
        return users;
    } else {
        return users;
    }
}
