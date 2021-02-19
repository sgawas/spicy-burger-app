export default {
    name: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Your Name'
        },
        value: '',
        validation: {
            required: true,
            validationText: 'Full Name is required!'
        },
        valid: false,
        touched: false
    },
    email: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'yourEmail@domain.com'
        },
        value: '',
        validation: {
            required: true,
            validationText: 'A valid Email is required.'
        },
        valid: false,
        touched: false
    },
    street: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Your Street'
        },
        value: '',
        validation: {
            required: true,
            validationText: 'A valid street address is required.'
        },
        valid: false,
        touched: false
    },
    zipcode: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Your Zipcode'
        },
        value: '',
        validation: {
            required: true,
            minLength: 5,
            maxLength: 5,
            checkNumber: true,
            validationText: 'Zipcode is required and must be 5 digits.'
        },
        valid: false,
        touched: false
    },
    state: {
        elementType: 'select',
        elementConfig: {
            options: [{
                value: 'Default',
                displayValue: 'Select State'
            },{
                value: 'OR',
                displayValue: 'Oregon'
            },{
                value: 'CA',
                displayValue: 'California'
            },{
                value: 'NV',
                displayValue: 'Nevada'
            },{
                value: 'NY',
                displayValue: 'New York'
            }]
        },
        validation: {},
        value: 'OR',
        valid: true
    },
    country: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Your Country'
        },
        validation: {},
        value: 'United States',
        valid: true
    },
    deliveryMethod: {
        elementType: 'select',
        elementConfig: {
            options: [{
                value: 'fastest',
                displayValue: 'Fastest'
            },{
                value: 'standard',
                displayValue: 'Standard'
            }]
        },
        validation: {},
        valid: true,
        value: 'standard'
    }
}