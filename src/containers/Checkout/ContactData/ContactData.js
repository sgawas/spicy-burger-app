import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './ContactData.css';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import InputData from './InputData/InputData';

class ContactData extends Component {
    state= {
        orderForm: InputData,
        loading: false,
        formIsValid: false
    }

    checkValidity = (value, rule) => {
        let isValid = false;
        value = value.trim();
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
        return isValid;
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading : true });
        const formData = {};
        for(let inputElement in this.state.orderForm){
            formData[inputElement] = this.state.orderForm[inputElement].value;
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData
        }

        axios.post('/orders.json', order)
            .then(response=> {
                console.log(response);
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch(err=> {
                console.log(err);
                this.setState({ loading: false });
            });
    }

    onInputChangeHandler = (event, inputIdentifier) => {
        const updatedOrderForm = { ...this.state.orderForm };
        const updatedInputElement = { ...updatedOrderForm[inputIdentifier] };
        updatedInputElement.value = event.target.value;
        updatedInputElement.touched = true;
        updatedInputElement.valid = this.checkValidity( updatedInputElement.value, updatedInputElement.validation )
        updatedOrderForm[inputIdentifier] = updatedInputElement;
        let formIsValid = true;
        for(let inputElement in updatedOrderForm){
            formIsValid = updatedOrderForm[inputElement].valid && formIsValid;
        }
        this.setState({ orderForm: updatedOrderForm, formIsValid });
    }

    render(){
        const formElementsArray = [];
        for(let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {
                    formElementsArray.map(formElement => (
                        <Input key={formElement.id} 
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            changed={(event)=> this.onInputChangeHandler(event,formElement.id)}
                            isInvalid={!formElement.config.valid}
                            shouldValidate={formElement.config.validation}
                            touched={formElement.config.touched}
                        />
                    ))
                }
                <Button btnType="Success" disabled={!this.state.formIsValid}>Order</Button>
            </form>
        );
        if(this.state.loading){
            form= <Spinner/>
        }
        return(
            <div className={classes.ContactData}>
                <h3>Enter Your Contact Details.</h3>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

export default connect(mapStateToProps)(ContactData);