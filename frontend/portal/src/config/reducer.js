import { combineReducers } from 'redux';

import rdLogs from '../reducers/logs';
import rdUsers from '../reducers/users';

export default combineReducers({
    rdLogs,
    rdUsers
});