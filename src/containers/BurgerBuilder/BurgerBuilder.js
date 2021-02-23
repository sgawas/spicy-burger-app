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
import * as burgerBuilderActions from '../../store/actions';

class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }
    state = {
        showSummary: false
    }

    componentDidMount() {
        console.log(this.props);
        this.props.onInitIngredients();
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

        let burger = this.props.error ? <p>Something went Wrong. Please Hold.</p> : <Spinner />;
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
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler( BurgerBuilder, axios ));