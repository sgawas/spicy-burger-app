import React, { Component } from 'react';

import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

    render(){
        const ingredientsSummary = Object.keys(this.props.ingredients)
            .map(igItem => {
                return (
                    this.props.ingredients[igItem] > 0 ?
                        <li key={igItem}>
                            <span style={{textTransform: 'capitalize'}}>{igItem}</span>: {this.props.ingredients[igItem]}
                        </li>
                        : null
                    
                )
            })

        return(
            <Aux>
                <h2>Order Details</h2>
                <h4>Your Order Total: ${this.props.orderTotal.toFixed(2)}</h4>
                <p>A spicy delicious burger with following ingredients:</p>
                <ul>
                    {ingredientsSummary}
                </ul>
                <p>Click Continue to checkout.</p>
                <Button btnType="Success" clicked={this.props.continueOrderSummary}>Continue</Button>
                <Button btnType="Danger" clicked={this.props.cancelOrderSummary}>Cancel</Button>
            </Aux>
        )
    }
};

export default OrderSummary;