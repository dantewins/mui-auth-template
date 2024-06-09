import { useState, useEffect, useMemo, useCallback, Fragment } from 'react';
import { Autocomplete as MUIAutocomplete, TextField, CircularProgress } from '@mui/material';
import { axiosPrivate as axios } from 'api/axios';
import { debounce } from '@mui/material/utils';

const Autocomplete = ({ route, label, name, formValues, setFormValues, propName, onOptionSelected, error, onChange, required }) => {
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [localInputValue, setLocalInputValue] = useState(formValues[name] || '');

    const fetchModels = useCallback(async (inputValue) => {
        if (inputValue.length < 2) return;

        setLoading(true);

        try {
            const response = await axios.get(`${route}?query=${inputValue}`);
            setOptions(response.data || []);
        } catch (error) {
            console.error("Error fetching models:", error);
        }

        setLoading(false);
    }, [route]);

    const debouncedFetchModels = useMemo(() => debounce(fetchModels, 400), [fetchModels]);

    useEffect(() => {
        if (localInputValue.length >= 2) {
            debouncedFetchModels(localInputValue);
        } else {
            setOptions([]);
        }

        return () => {
            debouncedFetchModels.clear();
        };
    }, [debouncedFetchModels, localInputValue]);

    useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    const handleInputChange = (event, newInputValue) => {
        setLocalInputValue(newInputValue);
        const e = { target: { name, value: newInputValue } };
        onChange(e);  // Trigger the onChange from useValidate
    };

    const handleChange = (event, newValue) => {
        if (newValue) {
            setFormValues(prevValues => ({ ...prevValues, [name]: newValue[propName] }));
            if (onOptionSelected) {
                onOptionSelected(newValue);
            }
        } else {
            setFormValues(prevValues => ({ ...prevValues, [name]: '' }));
            if (onOptionSelected) {
                onOptionSelected(null);
            }
        }
    };

    return (
        <MUIAutocomplete
            open={open}
            freeSolo
            filterOptions={(x) => x}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            inputValue={formValues[name] || ''}
            onInputChange={handleInputChange}
            isOptionEqualToValue={(option, value) => option._id === value}
            getOptionLabel={(option) => option[propName] || ""}
            options={options}
            loading={loading}
            onChange={handleChange}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={label}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <Fragment>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </Fragment>
                        ),
                    }}
                    error={!!error}
                    helperText={error}
                    required={required}
                />
            )}
        />
    );
};

export default Autocomplete;
