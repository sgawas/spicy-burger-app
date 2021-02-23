import { ids } from 'webpack';

import * as actionTypes from './actions';
import axios from '../../axios-orders';

const purchaseBurgerSuccess = (id, orderData)=> {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: ids,
        orderData
    }
}

const purchaseBurgerFail = (error)=> {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error
    }
}

export const purchaseBurgerStart = ( orderData ) => {
    return dispath => {
        axios.post('/orders.json', orderData)
            .then(res=> {
                console.log(res.data);
                dispath(purchaseBurgerSuccess(res.data, orderData));
            })
            .catch(err=> {
                dispath(purchaseBurgerFail(err));
            });
    }
}