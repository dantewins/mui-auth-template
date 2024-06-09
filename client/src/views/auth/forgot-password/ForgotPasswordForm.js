import { Link } from 'react-router-dom';
import { Grid, Box, Typography } from '@mui/material';

import Form from 'ui-component/forms/Form';

const initialValues = {
    email: ""
};

const formFields = [
    { name: 'email', label: 'Email Address', input: 'text', required: true }
];

const ForgotPasswordForm = () => {
    const customValidate = (values) => {
        let temp = {};

        if ("email" in values) {
            temp.email = values.email
                ? /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(values.email)
                    ? ""
                    : "This email is not valid."
                : "This field is required.";
        }

        return temp;
    };

    return (
        <Box sx={{ mt: 3 }}>
            <Form
                initialValues={initialValues}
                formFields={formFields}
                buttonLabel="Forgot password"
                route="/auth/forgotPassword"
                customValidate={customValidate}
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

export default ForgotPasswordForm