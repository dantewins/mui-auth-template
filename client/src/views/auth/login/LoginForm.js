import { Link } from 'react-router-dom';
import { Grid, Box, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';

import { axiosPrivate as axios } from 'api/axios';
import Form from 'ui-component/forms/Form';
import { SET_CURRENT_USER } from 'store/actions';

const initialValues = {
    email: "",
    password: ""
};

const formFields = [
    { name: 'email', label: 'Email Address', input: 'text', required: true },
    { name: 'password', label: 'Password', input: 'password', required: true }
];

const LoginForm = () => {
    const dispatch = useDispatch();

    const customValidate = (values) => {
        let temp = {};

        if ("email" in values) {
            temp.email = values.email
                ? /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(values.email)
                    ? ""
                    : "This email is not valid."
                : "This field is required.";
        }
        if ("password" in values) {
            temp.password = values.password ? "" : "This field is required.";
        }

        return temp;
    };

    const handleLogin = async (validate, values) => {
        if (validate()) {
            try {
                const response = await axios.post('/auth/login', values);

                dispatch({ type: SET_CURRENT_USER, payload: response.data, status: true });
            } catch (err) {
                await Swal.fire({
                    title: 'Operation Failed!',
                    text: err.response?.data?.message || err.message || 'Something went wrong!',
                    icon: 'error',
                    confirmButtonText: 'Ok!',
                });
            }
        }
    };

    return (
        <Box sx={{ mt: 3 }}>
            <Form
                initialValues={initialValues}
                formFields={formFields}
                buttonLabel="Log in"
                route="/auth/login"
                customValidate={customValidate}
                customSubmit={handleLogin}
            />
            <Grid container sx={{ mt: 3 }}>
                <Grid item xs>
                    <Link to="/auth/forgot-password" style={{ textDecoration: 'none' }}>
                        <Typography variant="body2" sx={{ color: 'primary.main' }}>
                            Forgot password?
                        </Typography>
                    </Link>
                </Grid>
                <Grid item>
                    <Link to="/auth/signup" style={{ textDecoration: 'none' }}>
                        <Typography variant="body2" sx={{ color: 'primary.main' }}>
                            Don't have an account? Sign Up
                        </Typography>
                    </Link>
                </Grid>
            </Grid>
        </Box>
    );
};

export default LoginForm;