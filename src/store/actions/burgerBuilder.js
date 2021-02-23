import * as actionTypes from './actions';
import axios from '../../axios-orders';

export const addIngredient = ingName => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: ingName
    }
}

export const removeIngredient = ingName => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingName
    }
}

export const setIngredients = ingredients => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients
    }
}

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const initIngredients = () => {
    return dispatch => {
        axios.get(process.env.REACT_APP_INGREDIENTS_DB_URL)
            .then(res => dispatch(setIngredients(res.data)))
            .catch(error => dispatch(fetchIngredientsFailed()));
    }
}