import { forwardRef } from "react";
import { IMaskInput } from "react-imask";
import { FormControl, OutlinedInput, InputLabel, FormHelperText } from '@mui/material';

const TextMaskCustom = forwardRef(function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
        <IMaskInput
            {...other}
            mask="(#00) 000-0000"
            definitions={{
                "#": /[1-9]/,
            }}
            inputRef={ref}
            onAccept={(value) => onChange({ target: { name: props.name, value } })}
            overwrite
        />
    );
});

const PhoneNumber = ({
    formValues,
    setFormValues,
    errors,
    validateField,
    required,
    isResetting 
}) => {
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues(prev => {
            const newValues = { ...prev, [name]: value };
            if (!isResetting) {
                validateField(name, value);
            }
            return newValues;
        });
    };

    return (
        <FormControl fullWidth error={!!errors.phoneNumber}>
            <InputLabel htmlFor="phoneNumber">
                Phone Number {required ? "*" : ""}
            </InputLabel>
            <OutlinedInput
                required={required}
                value={formValues.phoneNumber || ""}
                name="phoneNumber"
                id="phoneNumber"
                inputComponent={TextMaskCustom}
                onChange={handleChange}
                label="Phone Number"
            />
            <FormHelperText>{errors.phoneNumber}</FormHelperText>
        </FormControl>
    );
};

export default PhoneNumber;
