import { useState, useCallback, useRef } from 'react';

const useValidate = (initialValues, formFields, customValidate, visibilityRules) => {
    const [formValues, setFormValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const formValuesRef = useRef(initialValues);

    // Function to validate a single field
    const validateField = useCallback((name, value) => {
        let newError = "";
        const updatedFormValues = { ...formValuesRef.current, [name]: value };
        const field = formFields.find(f => f.name === name);
        if (field && (!visibilityRules || visibilityRules(name, updatedFormValues))) {
            if (field.required && !value) {
                newError = "This field is required.";
            }
            if (customValidate) {
                const validationResults = customValidate(updatedFormValues);
                newError = validationResults[name] || "";
            }
        }
        setErrors(prevErrors => ({ ...prevErrors, [name]: newError }));
    }, [formFields, customValidate, visibilityRules]);

    // Validate all fields (for use on form submission)
    const validateAllFields = useCallback(() => {
        let newErrors = {};
        formFields.forEach(field => {
            if (!visibilityRules || visibilityRules(field.name, formValuesRef.current)) {
                if (field.required && !formValuesRef.current[field.name]) {
                    newErrors[field.name] = "This field is required.";
                }
            }
            if (customValidate) {
                const tempErrors = customValidate(formValuesRef.current, { ...errors, ...newErrors });
                newErrors = { ...newErrors, ...tempErrors };
            }
        });
        setErrors(newErrors);
        return Object.values(newErrors).every(x => x === "");
    }, [formFields, customValidate, visibilityRules, errors]);

    const onChange = useCallback((e, resetPassword) => {
        const { name, value } = e.target;
        setFormValues(prev => {
            const newFormValues = { ...prev, [name]: value };
            formValuesRef.current = newFormValues;
            validateField(name, value);
            if (resetPassword) {
                const relatedFieldName = name === "password" ? 'cPassword' : 'password';
                validateField(relatedFieldName, newFormValues[relatedFieldName]);
            }
            return newFormValues;
        });
    }, [validateField]);

    return { formValues, setFormValues, errors, setErrors, onChange, validate: validateAllFields, validateField, formValuesRef };
};

export default useValidate;
