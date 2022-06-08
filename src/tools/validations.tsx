const required = (data: any): boolean => {
    const {value} = data;
    if (value == null) {
        return false;
    }
    if (typeof value === 'string' && value.trim().length === 0) {
        return false;
    }
    if (typeof value === 'boolean'){
        return value;
    }
    if (Array.isArray(value) && value.length === 0) {
        return false;
    }
    return !(typeof value === 'object' && Object.keys(value).length === 0);

};

const minLength = (data: any): boolean => {
    let {value = null, minLength = 0} = data;
    return  (value != null) && (value.length >= minLength || value.length === 0);
}

const maxLength = (data: any) => {
    let {value = null, maxLength = 0} = data;
    return value != null  && (value.length <= maxLength || value.length === 0);
}

const email = (data: any): boolean => {
    const {value} = data;
    return value != null && /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value);
};

const validationFunctions = {
    minLength,
    maxLength,
    required,
    email
};

export interface ValidationConfiguration {
    field: Validation[],
}

export interface Validation {
    rule?: string;
    minLength?: number;
    maxLength?: number;
    message?: string;
}

export const validate = (values: any, validations: any) => {

    let errors: any = {};
    Object.keys(values).forEach(key => {
        const value = values[key];
        const currentValidations = validations[key];
        if (currentValidations != null && Array.isArray(currentValidations)) {
            for (let i = 0; i < currentValidations.length; i++) {
                const validation = currentValidations[i] as Validation;
                if (validationFunctions.hasOwnProperty(validation.rule || '')) {
                    const data = {
                        value,
                        ...validation
                    }
                    const valid: boolean = validationFunctions[validation.rule || ''](data);
                    if (!valid) {
                        errors[key] = validation.message;
                        break;
                    }
                }
            }
        }
    });
    return errors;
};
