export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export const checkValidity = (value, rule) => {
    let isValid = false;
    value = value.trim();
    if (!rule) {
        return true;
    }
    if(rule.required){
        isValid = value !== '';
    }
    if(rule.minLength){
        isValid =  value.length >= rule.minLength && isValid;
    }
    if(rule.maxLength){
        isValid =  value.length <= rule.maxLength && isValid;
    }
    if(rule.checkNumber){
        isValid =  !isNaN(value) && isValid;
    }
    if (rule.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid
    }
    if (rule.isNumeric) {
        const pattern = /^\d+$/;
        isValid = pattern.test(value) && isValid
    }
    return isValid;
}