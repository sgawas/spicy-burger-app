import React from 'react';

import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    
    const ingredientsSummary = Object.keys(props.ingredients)
        .map(igItem => {
            return (
                props.ingredients[igItem] > 0 ?
                    <li key={igItem}>
                        <span style={{textTransform: 'capitalize'}}>{igItem}</span>: {props.ingredients[igItem]}
                    </li>
                    : null
                
            )
        })

    return(
        <Aux>
            <h2>Order Details</h2>
            <h4>Your Order Total: ${props.orderTotal.toFixed(2)}</h4>
            <p>A spicy delicious burger with following ingredients:</p>
            <ul>
                {ingredientsSummary}
            </ul>
            <p>Click Continue to checkout.</p>
            <Button btnType="Success" clicked={props.continueOrderSummary}>Continue</Button>
            <Button btnType="Danger" clicked={props.cancelOrderSummary}>Cancel</Button>
        </Aux>
    )
};

export default orderSummary;