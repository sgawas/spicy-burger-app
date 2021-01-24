import React, { Component } from 'react';

import classes from './Modal.css';
import Aux from '../../../hoc/Aux';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component{
    shouldComponentUpdate(nextProps, nextState){
        return nextProps.showOrderSummary !== this.props.showOrderSummary;
    }

    componentDidUpdate(){
        console.log('[Modal] did update')
    }

    render(){
        return (
            <Aux>
                <Backdrop 
                    clicked={this.props.cancelOrderSummary} 
                    showSummary={this.props.showOrderSummary}/>
                <div className={classes.Modal}
                    style={{
                        transform: this.props.showOrderSummary ? 'translateY(0)': 'translateY(-100vh)',
                        opacity: this.props.showOrderSummary ? '1' : '0'
                    }}>
                    {this.props.children}
                </div>
            </Aux>
        );
    }
} 

export default Modal;