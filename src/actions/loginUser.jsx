import { names } from './actionIndex.jsx';

export const loginUser = (user) => {
    return {
        type: names.USER_LOGGED_IN,
        payload: user
    }
};