import React from 'react';

import classes from './BuildControls.css';

import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad'},
    { label: 'Cheese', type: 'cheese'},
    { label: 'Bacon', type: 'bacon'},
    { label: 'Meat', type: 'meat'}
];

const buildControls = ( props ) => {
    return (
        <div className={classes.BuildControls}>
            <h3>Total Price: $<strong>{props.price.toFixed(2)}</strong></h3>
            {
                controls.map(ctrl => (
                    <BuildControl 
                        key={ctrl.label} 
                        label={ctrl.label} 
                        add={()=> props.addedIngredient(ctrl.type)}
                        remove={()=> props.removedIngredient(ctrl.type)} 
                        disabled={props.disabled[ctrl.type]}   
                    />
                ))
            }
            <button className={classes.OrderButton} disabled={!props.purchase} onClick={props.clickedOrderNow}>{props.isAuth ? 'ORDER NOW' : 'SignIn Or SignUp'}</button>
        </div>
    );
}

export default buildControls;