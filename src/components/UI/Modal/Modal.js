import React from 'react';

import classes from './Modal.css';
import Aux from '../../../hoc/Aux';
import Backdrop from '../Backdrop/Backdrop';

const modal = (props) => (
    <Aux>
        <Backdrop clicked={props.cancelOrderSummary} showSummary={props.showOrderSummary}/>
        <div className={classes.Modal}
            style={{
                transform: props.showOrderSummary ? 'translateY(0)': 'translateY(-100vh)',
                opacity: props.showOrderSummary ? '1' : '0'
            }}>
            {props.children}
        </div>
    </Aux>
);

export default modal;