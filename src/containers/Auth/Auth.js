import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import classes from './Auth.css';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions';
import { checkValidity } from '../../store/utility';
import inputData from './InputData/InputData';

class Auth extends Component {

    state = {
        controls: inputData,
        isSignUp: true
    };

    componentDidMount(){
        if(!this.props.buildingBurger && this.props.authRedirectPath){
            this.props.onSetAuthRedirectPath();
        }
    }

    onInputChangeHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };
        this.setState({ controls: updatedControls });
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
    }

    onSwitchSignUpHandler = () => {
        this.setState(prevState => {
            return { isSignUp: !prevState.isSignUp };
        })
    }

    render() {
        const formElementsArray = [];
        for(let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        let form = formElementsArray.map(formElement=>(
            <Input key={formElement.id} 
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                changed={(event)=> this.onInputChangeHandler(event,formElement.id)}
                isInvalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
            />
        ));

        if(this.props.loading) {
            form = <Spinner />;
        }
        let errorMessage = null;
        if(this.props.error) {
            let message = this.props.error.message;
            if( message === 'EMAIL_EXISTS'){
                errorMessage = (
                    <p>The email address is already in use.</p>
                );
            }
            else if( message === 'INVALID_PASSWORD'){
                errorMessage = (
                    <p>Invalid Email/Password combination. Please use valid credentials.</p>
                );
            } else if( message === 'EMAIL_NOT_FOUND'){
                errorMessage = (
                    <p>Invalid Email/Password combination. Please use valid credentials.</p>
                );
            } else if( message === 'TOO_MANY_ATTEMPTS_TRY_LATER'){
                errorMessage = (
                    <p>Something went wrong. Try again later.</p>
                );
            } 
            // else {
            //     errorMessage = (
            //         <p>Something went wrong please try again.</p>
            //     );
            // } 
        }

        let authRedirect = null;
        if(this.props.isAuthenticated && this.props.buildingBurger){
            authRedirect=<Redirect to="/checkout" />
        }
        else if(this.props.isAuthenticated){
            authRedirect=<Redirect to="/" />
        }

        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType='Success'>Submit</Button>
                </form>
                <Button btnType='Danger' clicked={this.onSwitchSignUpHandler}>Switch to {!this.state.isSignUp ? 'SignUp' : 'SignIn'}</Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);