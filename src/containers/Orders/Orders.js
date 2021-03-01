import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler';
import axios from '../../axios-orders';
import * as actions from '../../store/actions'
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {

    componentDidMount(){
        this.props.onFetchOrders(this.props.token, this.props.userId);
    }

    render(){
        let ordersDom = <Spinner />
        if(!this.props.loading){
            ordersDom = (this.props.orders.map(order => (
                <Order key={order.id} price={order.price} ingredients={order.ingredients}/>
            )));
        }
        return(
            <div>
                {ordersDom}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));