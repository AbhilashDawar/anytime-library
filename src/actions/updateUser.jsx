import { names } from './actionIndex.jsx';

export const profileSave = (user) => {
    return {
        type: names.USER_PROFILE_SAVED,
        user
    }
};