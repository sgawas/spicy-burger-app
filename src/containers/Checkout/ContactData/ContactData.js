import React, { Component } from 'react';

import classes from './ContactData.css';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    state= {
        name:'',
        email:'',
        address: {
            street: '',
            postalCode : ''
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
        let form = (
            <form>
                <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
                <input className={classes.Input} type="email" name="email" placeholder="Your Email" />
                <input className={classes.Input} type="text" name="street" placeholder="Your Stree Address" />
                <input className={classes.Input} type="text" name="postalCode" placeholder="Your Postal Code" />
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