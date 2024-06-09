import { Backdrop, CircularProgress } from '@mui/material';

const Loading = ({ active }) => {
    return (
        <Backdrop open={active} sx={{
            color: '#fff',
            zIndex: (theme) => theme.zIndex.modal + 1,
            opacity: 0.5,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}>
            <CircularProgress color="inherit" />
        </Backdrop>
    );
}

export default Loading