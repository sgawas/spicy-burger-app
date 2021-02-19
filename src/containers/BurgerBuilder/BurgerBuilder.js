import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-orders';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/withErrorHandler';
import * as actionTypes from '../../store/actions/actions';

class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }
    state = {
        showSummary: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        // axios.get(process.env.REACT_APP_INGREDIENTS_DB_URL)
        //     .then(res => this.setState({ ingredients : res.data }))
        //     .catch(error => this.setState( { error: true }));
    }

    updatePurchaseable = (ingredients) => {
        // not using this becaue it will not fetch updated ingredients
        //const ingredients = {...this.state.ingredients}
        const sum = Object.keys(ingredients)
            .map(igKey=> {
                return ingredients[igKey];
            })
            .reduce((sum, el) => sum + el, 0);
        return sum > 0;
    }

    showSummaryHandler = ()=> {
        this.setState({ showSummary: true });
    }

    cancelSummaryHandler = () => {
        this.setState({ showSummary: false });
    }

    continueSummaryHandler = () => {
        this.props.history.push('/checkout');
    }

    render () {
        // takes ingredient and checks if their count is >0
        const disabledInfo = {...this.props.ings};
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let burger = this.state.error ? <p>Something went Wrong. Please Hold.</p> : <Spinner />;
        let orderSummary = <Spinner />;
        if(this.props.ings){
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls 
                        addedIngredient={this.props.onIngredientAdded} 
                        removedIngredient={this.props.onIngredientRemoved} 
                        disabled={disabledInfo}
                        price={this.props.price}
                        purchase={this.updatePurchaseable(this.props.ings)}
                        clickedOrderNow={this.showSummaryHandler}
                    />
                </Aux>
            );
            orderSummary = <OrderSummary 
                ingredients={this.props.ings} 
                cancelOrderSummary={this.cancelSummaryHandler}
                continueOrderSummary={this.continueSummaryHandler}
                orderTotal={this.props.price}
            />
        }

        if(this.state.loading){
            orderSummary = <Spinner />
        }
        
        return (
            <Aux>
                <Modal showOrderSummary={this.state.showSummary} cancelOrderSummary={this.cancelSummaryHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
        onIngredientRemoved: (ingName) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler( BurgerBuilder, axios ));