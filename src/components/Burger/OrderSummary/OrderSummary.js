import React from 'react';

import Aux from '../../../hoc/Aux';

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
            <h3>Your Order</h3>
            <p>A spicy delicious burger with following ingredients:</p>
            <ul>
                {ingredientsSummary}
            </ul>
            <p>Click Continue to checkout.</p>
        </Aux>
    )
};

export default orderSummary;