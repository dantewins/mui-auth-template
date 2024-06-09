import { useRef, useCallback } from "react";
import { TextField, Button, InputAdornment } from '@mui/material';

const File = ({ label, name, setFiles, setFormValues, fileName, clearFiles }) => {
    const hiddenFileInput = useRef(null);

    const handleFileChange = useCallback((selectedFiles, name) => {
        const fileNames = Array.from(selectedFiles).map(file => file.name).join(', ');

        setFormValues(prevValues => ({
            ...prevValues,
            [name]: fileNames
        }));

        setFiles(prev => ({ ...prev, [name]: selectedFiles }));
    }, [setFiles, setFormValues]);

    const handleChange = (event) => {
        const files = event.target.files;
        if (files.length > 0) {
            handleFileChange(files, name);
        } else {
            clearFiles();
        }
    };

    const handleChooseFileClick = () => {
        hiddenFileInput.current.value = "";
        hiddenFileInput.current.click();
    };

    return (
        <>
            <input
                accept="image/*"
                style={{ display: 'none' }}
                ref={hiddenFileInput}
                id={label}
                multiple
                type="file"
                name={name}
                onChange={handleChange}
            />
            <TextField
                fullWidth
                label={label}
                InputProps={{
                    readOnly: true,
                    endAdornment: (
                        <InputAdornment position="end">
                            <Button
                                color="primary"
                                component="span"
                                size="small"
                                onClick={handleChooseFileClick}
                            >
                                Choose File
                            </Button>
                        </InputAdornment>
                    ),
                }}
                variant="outlined"
                margin="normal"
                name={name}
                value={fileName}
            />
        </>
    )
}

export default File;