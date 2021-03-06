import React from 'react';

import classes from './Order.css';

const order = (props) => {
    const ingredients = [];

    for( let ingName in props.ingredients){
        if(+props.ingredients[ingName] !== 0){
            ingredients.push({
                name: ingName,
                amount: +props.ingredients[ingName]
            });
        }
    };

    const ingredientOutput = ingredients.map(ig =>(
        <span 
            key={ig.name}
            style={{
            textTransform: 'capitalize',
            display: 'inline-block',
            margin: '0 8px',
            border: '1px solid #ccc',
            padding: '5px'
            }}>
            {ig.name} ({ig.amount})
        </span>
    ));

    return (
        <div className={classes.Order}>
            <p>ingredient: {ingredientOutput}</p>
            <p>price: <strong>$ {Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    );
}

export default order;