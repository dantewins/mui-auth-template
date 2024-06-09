import { axiosPrivate as axios } from 'api/axios';
import { SET_CURRENT_USER } from 'store/actions';

export const fetchCurrentUser = async (dispatch, setLoading, setInitialLoading) => {
    try {
        const response = await axios.get("/auth/currentUser");
        dispatch({ type: SET_CURRENT_USER, payload: response.data, status: true });
    } catch (error) {
        console.error("Failed to fetch current user:", error);
        dispatch({ type: SET_CURRENT_USER, payload: { currentUser: null }, status: false });
    } finally {
        if (typeof setInitialLoading === 'function') {
            setInitialLoading(false);
        }
        if (typeof setLoading === 'function') {
            setLoading(false);
        }
    }
};
