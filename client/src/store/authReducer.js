import { SET_CURRENT_USER, LOGOUT_USER } from './actions';

const initialState = {
    currentUser: null,
    isAuthenticated: false,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload,
                isAuthenticated: action.status,
            };

        case LOGOUT_USER:
            return {
                ...state,
                currentUser: null,
                isAuthenticated: false,
            };

        default:
            return state;
    }
};

export default authReducer;