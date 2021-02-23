import * as actionTypes from './actions';
import axios from '../../axios-orders';

const purchaseBurgerSuccess = (id, orderData)=> {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData
    }
}

const purchaseBurgerFail = (error)=> {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error
    }
}

const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = ( orderData ) => {
    return dispath => {
        dispath(purchaseBurgerStart());
        axios.post('/orders.json', orderData)
            .then(res=> {
                console.log(res.data);
                dispath(purchaseBurgerSuccess(res.data.name, orderData));
            })
            .catch(err=> {
                dispath(purchaseBurgerFail(err));
            });
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}