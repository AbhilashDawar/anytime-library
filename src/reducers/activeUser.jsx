import { names } from '../actions/actionIndex.jsx';

export default (state = null, action) => {
    switch (action.type) {
        case names.USER_LOGGED_IN:
            return action.payload;
            break;
        case names.USER_LOGGED_OUT:
            return action.payload;
            break;
    }
    return state;
}