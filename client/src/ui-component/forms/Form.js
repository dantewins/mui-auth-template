import { useState, useCallback, useEffect } from 'react';
import { Grid, TextField, Button, MenuItem, InputAdornment, Checkbox } from '@mui/material';
import Loading from 'ui-component/loaders/Loading';
import File from 'ui-component/inputs/File';
import Autocomplete from 'ui-component/inputs/Autocomplete';
import PhoneNumber from 'ui-component/inputs/PhoneNumber';
import useValidate from 'hooks/useValidate';
import useAxiosPost from 'hooks/useAxiosPost';

const Form = ({
    initialValues,
    formFields,
    buttonLabel,
    buttonColor = 'primary',
    customValidate,
    customSubmit,
    route,
    visibilityRules,
    callback,
    data,
    updateFormValues,
    resetButton = false,
    onReset
}) => {
    const { formValues, setFormValues, errors, setErrors, onChange, validate, validateField, formValuesRef } = useValidate(initialValues, formFields, customValidate, visibilityRules);
    const axiosPost = useAxiosPost();

    const [loading, setLoading] = useState(false);
    const [files, setFiles] = useState({});
    const [isResetting, setIsResetting] = useState(false);

    useEffect(() => {
        if (data && updateFormValues) {
            updateFormValues(setFormValues, formValuesRef, data);
            setErrors({});
        }
    }, [data, setFormValues, updateFormValues, formValuesRef, setErrors]);

    const handleSubmit = useCallback(async (event) => {
        event.preventDefault();
        if (validate()) {
            setLoading(true);
            try {
                const hasFiles = Object.keys(files).length > 0;
                const formData = new FormData();

                // Append form values to formData
                Object.entries(formValues).forEach(([key, value]) => {
                    if (!visibilityRules || visibilityRules(key, formValues)) {
                        formData.append(key, value);
                    }
                });

                // Append files to formData if any
                if (hasFiles) {
                    Object.entries(files).forEach(([name, selectedFiles]) => {
                        [...selectedFiles].forEach(file => {
                            formData.append(name, file);
                        });
                    });
                }

                // Make the POST request
                await axiosPost(route, formData, {
                    headers: {
                        'Content-Type': hasFiles ? 'multipart/form-data' : 'application/json'
                    }
                }, () => {
                    if (typeof callback === 'function') {
                        callback(true);
                    }

                    setFormValues(initialValues);
                    setLoading(false);
                    setIsResetting(true);
                    setFiles({});
                    setTimeout(() => setIsResetting(false), 0);
                });
            } catch (err) {
                console.error("Submission error:", err);
                setLoading(false);
            }
        }
    }, [validate, formValues, files, axiosPost, route, callback, visibilityRules, initialValues, setFormValues]);

    const clearFiles = useCallback(() => {
        setFiles({});
        const resetFileValues = Object.keys(formValues).reduce((acc, key) => {
            if (formFields.find(field => field.name === key && field.input === 'file')) {
                acc[key] = '';
            } else {
                acc[key] = formValues[key];
            }
            return acc;
        }, {});
        setFormValues(resetFileValues);
    }, [formValues, formFields, setFormValues]);

    const renderField = (field) => {
        switch (field.input) {
            case 'password':
            case 'text':
            case 'date':
            case 'time':
            case 'textarea':
                return (
                    <TextField
                        required={field.required}
                        label={field.label}
                        type={field.input === 'textarea' ? 'text' : field.input}
                        fullWidth
                        name={field.name}
                        onChange={(e) => onChange(e, field.resetPassword)}
                        value={formValues[field.name]}
                        error={!!errors[field.name]}
                        helperText={errors[field.name]}
                        multiline={field.input === 'textarea'}
                        rows={field.input === 'textarea' ? field.rows || 5 : null}
                        {...(field.input === 'time' || field.input === 'date' ? { InputLabelProps: { shrink: true } } : {})}
                        disabled={field.disabled}
                    />
                );
            case 'autocomplete':
                return (
                    <Autocomplete
                        route={field.route}
                        label={field.label}
                        name={field.name}
                        formValues={formValues}
                        setFormValues={setFormValues}
                        propName={field.propName}
                        onOptionSelected={field.onOptionSelected}
                        error={errors[field.name]}
                        onChange={onChange}
                        required={field.required}
                    />
                );
            case 'checkbox':
                return (
                    <TextField
                        fullWidth
                        label={field.label}
                        disabled
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    <Checkbox
                                        checked={formValues[field.name]}
                                        onChange={(e) => {
                                            setFormValues({ ...formValues, [field.name]: e.target.checked });
                                        }}
                                    />
                                </InputAdornment>
                            ),
                        }}
                    />
                );
            case 'dropdown':
                return (
                    <TextField
                        required={field.required}
                        select
                        label={field.label}
                        fullWidth
                        name={field.name}
                        value={formValues[field.name]}
                        onChange={onChange}
                        error={!!errors[field.name]}
                        helperText={errors[field.name]}
                    >
                        {field.items && field.items.map(item => (
                            <MenuItem key={'value' in item ? item.value : item.label} value={'value' in item ? item.value : item.label}>
                                {item.label}
                            </MenuItem>
                        ))}
                    </TextField>
                );
            case 'file':
                return (
                    <File
                        label={field.label}
                        name={field.name}
                        setFiles={setFiles}
                        setFormValues={setFormValues}
                        fileName={formValues[field.name]}
                        clearFiles={clearFiles}
                    />
                );
            case 'phone':
                return (
                    <PhoneNumber
                        formValues={formValues}
                        setFormValues={setFormValues}
                        errors={errors}
                        validateField={validateField}
                        required={field.required}
                        isResetting={isResetting}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <Grid container spacing={2}>
            <Loading active={loading} />
            {formFields.map((field, index) => (
                visibilityRules && !visibilityRules(field.name, formValues) ? null : (
                    <Grid item xs={12} sm={field.sm || 12} key={index} mt={field.input === 'file' ? -2 : 0}>
                        {renderField(field)}
                    </Grid>
                )
            ))}
            <Grid item xs={resetButton ? 10 : 12}>
                <Button type="submit" fullWidth variant="contained" color={buttonColor} onClick={customSubmit ? (event) => customSubmit(validate, formValues, setLoading, () => setFormValues(initialValues)) : handleSubmit}>
                    {buttonLabel}
                </Button>
            </Grid>
            {resetButton && (
                <Grid item xs={2}>
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{ backgroundColor: 'grey.500', color: 'white', '&:hover': { backgroundColor: 'grey.700', opacity: 0.8 }, transition: 'ease-in-out 0.2s' }}
                        onClick={() => {
                            setFormValues(initialValues); // Default reset behavior
                            if (typeof onReset === 'function') onReset();
                        }}
                    >
                        Clear
                    </Button>
                </Grid>
            )}
        </Grid>
    );
};

export default Form;
