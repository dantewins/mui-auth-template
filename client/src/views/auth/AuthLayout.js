import { useState, useEffect, useCallback } from 'react';
import { Avatar, Box, Typography, Container, CircularProgress } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { useSearchParams } from 'react-router-dom';

import { axiosPrivate as axios } from 'api/axios';
import AuthCopyright from './AuthCopyright';

const AuthLayout = ({ title, child, validation, route, alternative }) => {
    const [valid, setValid] = useState(null);
    const [loading, setLoading] = useState(true); // Loading state
    const [searchParams] = useSearchParams();
    const secret = searchParams.get('secret');

    const validateResetLink = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.post(route, { secret });
            setValid(response.status === 203);
        } catch (err) {
            setValid(false);
        } finally {
            setLoading(false);
        }
    }, [route, secret]);

    useEffect(() => {
        if (validation) {
            validateResetLink();
        } else {
            setLoading(false);
        }
    }, [secret, validateResetLink, validation]);

    if (loading) {
        return (
            <Container component="main" maxWidth="xs" sx={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CircularProgress />
            </Container>
        );
    }

    return (
        <Container component="main" maxWidth="xs" sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',  // Centers children vertically
                    alignItems: 'center',      // Centers children horizontally
                    flexGrow: 1,               // Makes the box grow to fill available space
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: "primary.light" }}>
                    <LockOutlined />
                </Avatar>
                <Typography component="h1" variant="h2">
                    {title}
                </Typography>
                {validation === true ? (valid === true ? child : alternative) : child}
            </Box>
            <Box sx={{ mt: 2, mb: 2 }}>
                <AuthCopyright />
            </Box>
        </Container>
    )
}

export default AuthLayout;
