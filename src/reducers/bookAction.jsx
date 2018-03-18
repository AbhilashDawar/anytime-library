import { names } from '../actions/actionIndex.jsx';

export default (state = null, action) => {
    if (action.type === names.BOOK_ACTION) {
        return action.payload;
    } else {
        return state;
    }
}