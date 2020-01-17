import { SET_USER_CURRENT } from './types';

const setUserCurrent = userCurrent => ({ type: SET_USER_CURRENT, payload: { userCurrent } });

export const getUserCurrent = () => async dispatch => {

    // TODO
    // Fazer chamada na api para trazer o user e setar no redux
	// await dispatch(setUserCurrent(users));
}