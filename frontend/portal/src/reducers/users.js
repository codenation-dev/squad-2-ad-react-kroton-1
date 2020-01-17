import { SET_USER_CURRENT } from '../actions/types';

const initialState = {
	userCurrent: [],
};

export default (state = initialState, action) => {

	switch (action.type) {

		case SET_USER_CURRENT:
			return { ...state, userCurrent: action.payload.userCurrent }

		default:
			return state;
	}
}