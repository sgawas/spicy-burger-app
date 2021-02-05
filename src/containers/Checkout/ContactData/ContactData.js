import React, { Component } from 'react';

import classes from './ContactData.css';
import Button from '../../../components/UI/Button/Button';

class ContactData extends Component {
    state= {
        name:'',
        email:'',
        address: {
            street: '',
            postalCode : ''
        }
    }

    render(){
        return(
            <div className={classes.ContactData}>
                <form>
                    <input type="text" name="name" placeholder="Your Name" />
                    <input type="email" name="email" placeholder="Your Email" />
                    <input type="text" name="street" placeholder="Your Stree Address" />
                    <input type="text" name="postalCode" placeholder="Your Postal Code" />
                    <Button btnType="Success" clicked="">Save</Button>
                </form>
            </div>
        );
    }
}

export default ContactData;