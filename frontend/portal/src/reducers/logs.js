import { SET_LOGS } from '../actions/types';

const initialState = {
	logs: [],
};

export default (state = initialState, action) => {

	switch (action.type) {

		case SET_LOGS:
			return { ...state, logs: action.payload.logs }

		default:
			return state;
	}
}