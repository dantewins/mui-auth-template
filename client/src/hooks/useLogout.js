import { axiosPrivate as axios } from 'api/axios';
import { useDispatch } from 'react-redux';

const useLogout = () => {
    const dispatch = useDispatch();

    const logout = async () => {
        dispatch({
            type: 'LOGOUT_USER'
        });

        try {
            await axios.post("/auth/logout", {}, {
                withCredentials: true
            });
        } catch (err) {
            console.log(err);
        }
    };

    return logout;
};

export default useLogout;