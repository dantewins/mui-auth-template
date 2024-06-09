import { Typography, Link } from "@mui/material";

const Copyright = ({ style }) => {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...style}
        >
            {"Copyright © "}
            <Link color="inherit" href="https://uwshub.com/">
                United Warranty Service
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

export default Copyright