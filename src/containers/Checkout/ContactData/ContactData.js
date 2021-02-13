import React, { Component } from 'react';

import classes from './ContactData.css';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state= {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Street'
                },
                value: ''
            },
            zipcode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Zipcode'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Country'
                },
                value: ''
            // },
            // deliveryMethod: {
            //     elementType: 'select',
            //     elementConfig: {
            //         options: [{
            //             value: 'fastest',
            //             displayValue: 'Fastest'
            //         },{
            //             value: 'standard',
            //             displayValue: 'Standard'
            //         }]
            //     },
            //     value: ''
            }
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading : true });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Suraj Gawas',
                address: {
                    street: 'greystone st',
                    zipcode: 97772
                },
                email: 'suraj@email.com'
            },
            deliveryMethod: 'Express'
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
        console.log("----",this.props)
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
            <form>
                {
                    formElementsArray.map(formElement => (
                        <Input key={formElement.id} 
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                        />
                    ))
                }
                <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
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

export default ContactData;