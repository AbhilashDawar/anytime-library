import { names } from './actionIndex.jsx';

export const selectUser = (user) => {
    return {
        type: names.USER_LOGGED_OUT,
        payload: null
    }
};