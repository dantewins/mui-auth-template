import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Grid, Box, Typography } from '@mui/material';

import useAxiosPost from 'hooks/useAxiosPost';
import Form from 'ui-component/forms/Form';

const initialValues = {
    password: "",
    cPassword: ""
};

const formFields = [
    { name: 'password', label: 'Password', input: 'text', required: true, resetPassword: true },
    { name: 'cPassword', label: 'Confirm Password', input: 'text', required: true, resetPassword: true }
];

const ResetPasswordForm = () => {
    const [searchParams] = useSearchParams();
    const secret = searchParams.get('secret');
    const navigate = useNavigate();
    const axiosPost = useAxiosPost();

    const customValidate = (values) => {
        console.log(values)
        let temp = {};

        if ("password" in values) {
            temp.password = values.password
                ? values.password.length >= 8
                    ? values.password === values.cPassword ? "" : "Passwords must be equal"
                    : "Password must be than 8 characters or greater."
                : "This field is required.";
        }
        if ("cPassword" in values) {
            temp.cPassword = values.cPassword
                ? values.cPassword.length >= 8
                    ? values.cPassword === values.password ? "" : "Passwords must be equal"
                    : "Password must be than 8 characters or greater."
                : "This field is required.";
        }

        return temp;
    };

    const handleResetPassword = async (validate, values, setLoading) => {
        if (validate()) {
            try {
                await axiosPost('/auth/resetPassword', { ...values, secret }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }, () => {
                    setLoading(false);
                    navigate("/auth/login");
                });
            } catch (err) { }
        }
    };

    return (
        <Box sx={{ mt: 3 }}>
            <Form
                initialValues={initialValues}
                formFields={formFields}
                buttonLabel="Reset password"
                route="/auth/resetPassword"
                customValidate={customValidate}
                customSubmit={handleResetPassword}
            />
            <Grid container sx={{ mt: 3 }} justifyContent="flex-end">
                <Grid item>
                    <Link to="/auth/login" style={{ textDecoration: 'none' }}>
                        <Typography variant="body2" sx={{ color: 'primary.main' }}>
                            Remember your password?
                        </Typography>
                    </Link>
                </Grid>
            </Grid>
        </Box>
    )
}

export default ResetPasswordForm