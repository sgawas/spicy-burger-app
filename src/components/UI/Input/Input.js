import React from 'react';

import classes from './Input.css'

const Input = (props) => {
    let inputElement = null;
    let validationError = null;
    const inputClass = [ classes.InputElement ];
    if(props.isInvalid && props.shouldValidate && props.touched){
        inputClass.push(classes.Invalid);
    }
    if(props.isInvalid && props.touched){
        validationError = <p className={classes.ValidationError}>{props.shouldValidate.validationText}</p>
    }
    switch(props.elementType){
        case 'input':
            inputElement = <input onChange={props.changed}
                                className={inputClass.join(' ')} 
                                {...props.elementConfig} 
                                value={props.value} />
            break;
        case 'textarea':
            inputElement = <textarea onChange={props.changed} 
                                className={inputClass.join(' ')} 
                                {...props.elementConfig} 
                                value={props.value} />
            break;
        case 'select':
            inputElement = (
                <select onChange={props.changed} 
                    className={inputClass.join(' ')} 
                    value={props.value} >
                    {props.elementConfig.options.map(option=> (
                        <option key={option.value} value={option.value}>{option.displayValue}</option>
                    ))}
                </select>);
            break;
        default:
            inputElement = <input onChange={props.changed} className={inputClass.join(' ')}  
                                {...props.elementConfig} 
                                value={props.value} />
            break;    
    }
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    );
}
export default Input;