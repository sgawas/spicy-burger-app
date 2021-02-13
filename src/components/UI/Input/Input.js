import React from 'react';

import classes from './Input.css'

const Input = (props) => {
    let inputElement = null;
    function onHandler() {

    }
    switch(props.elementType){
        case 'input':
            inputElement = <input onChange={this.onHandler}
                                className={classes.InputElement} 
                                {...props.elementConfig} 
                                value={props.value} />
            break;
        case 'textarea':
            inputElement = <textarea onChange={this.onHandler} 
                                className={classes.InputElement} 
                                {...props.elementConfig} 
                                value={props.value} />
            break;
        default:
            inputElement = <input onChange={this.onHandler} className={classes.InputElement} 
                                {...props.elementConfig} 
                                value={props.value} />
            break;    
    }
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
}
export default Input;