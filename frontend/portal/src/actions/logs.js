import { SET_LOGS } from './types';

const setLogs = logs => ({ type: SET_LOGS, payload: { logs } });

export const getLogs = () => async dispatch => {

    // TODO
    // Fazer chamada na api para trazer os logs e setar no redux
	// await dispatch(setLogs(logs));
}