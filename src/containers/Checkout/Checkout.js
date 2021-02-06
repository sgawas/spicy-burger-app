import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    state = {
        ingredients: {},
        price: 0
    }

    componentDidMount(){
        const query = new URLSearchParams(this.props.location.search); 
        console.log(query.entries());
        let ingredients = {};
        for(let param of query.entries()){
            // [ 'salad', '1' ], ['cheese', '1]
            if(param[0]!== 'price'){
                ingredients[param[0]] = +param[1];
            }else {
                this.setState({ price : +param[1] });
            }
        }
        console.log(ingredients);
        this.setState({ ingredients });
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render(){
        return(
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients} 
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}
                />
                <Route 
                    path={ this.props.match.path + '/contact-data'} 
                    render={(props)=> (<ContactData ingredients={this.state.ingredients} price={this.state.price} {...props}/>)}
                />
            </div>
        );
    }
}

export default Checkout;