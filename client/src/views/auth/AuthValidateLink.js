import { Typography, Grid, Link } from '@mui/material';
import { Link as Redirect } from 'react-router-dom';

const LinkValidation = ({ title, valid }) => (
    <>
        <Typography
            mt={2}
            component="h2"
            variant="h3"
            sx={{ textAlign: "center" }}
        >
            {valid ? 'Verification successful' : `This ${title} link is either expired or invalid`}
        </Typography>
        <Grid container justifyContent="center" mt={2}>
            <Grid item>
                <span>
                    <Typography variant="body2" display="inline">
                        Go back to
                    </Typography>
                    <Link variant="body2" underline="none" component={Redirect} to="/auth/login" ml={0.5}>
                        Log in
                    </Link>
                </span>
            </Grid>
        </Grid>
    </>
);

export default LinkValidation;
