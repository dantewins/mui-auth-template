import { Link } from 'react-router-dom';
import { Grid, Box, Typography } from '@mui/material';

import Form from 'ui-component/forms/Form';

const initialValues = {
    contactName: "",
    email: "",
    password: "",
    phoneNumber: ""
};

const formFields = [
    { name: 'email', label: 'Email Address', input: 'text', required: true },
    { name: 'password', label: 'Password', input: 'password', required: true },
    { name: 'phoneNumber', label: 'Phone Number', input: 'phone', required: true },
    { name: 'contactName', label: 'Contact Name', input: 'text', required: true }
];

const SignupForm = () => {
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
            temp.password = values.password
                ? values.password.length >= 8
                    ? ""
                    : "Password must be 8 characters or greater."
                : "This field is required.";
        }
        if ("phoneNumber" in values) {
            temp.phoneNumber = values.phoneNumber
                ? values.phoneNumber.length === 14
                    ? ""
                    : "This phone number doesn't have 10 digits."
                : "This field is required.";
        }
        if ("contactName" in values) {
            temp.contactName = values.contactName ? "" : "This field is required.";
        }

        return temp;
    };

    return (
        <Box sx={{ mt: 3 }}>
            <Form
                initialValues={initialValues}
                formFields={formFields}
                buttonLabel="Sign Up"
                route="/auth/signup"
                customValidate={customValidate}
            />
            <Grid container justifyContent="flex-end" sx={{ mt: 3 }}>
                <Grid item color="primary">
                    <Link to="/auth/login" variant="body2" style={{ textDecoration: 'none' }}>
                        <Typography variant="body2" sx={{ color: 'primary.main' }}>
                            Already have an account? Login
                        </Typography>
                    </Link>
                </Grid>
            </Grid>
        </Box>
    );
};

export default SignupForm;