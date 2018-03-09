import { names } from './actionIndex.jsx';

export const logoutUser = () => {
    return {
        type: names.USER_LOGGED_OUT,
        payload: null
    }
};