import { names } from './actionIndex.jsx';

export const newUser = (user) => {
    return {
        type: names.NEW_USER,
        payload: user
    }
};