import React, { Component } from 'react';
import axios from '../../axios-orders';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 1.2,
    meat: 2.0,
    cheese: 0.5,
    bacon: 0.7
};

class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }
    state = {
        ingredients: null,
        totalPrice: 4,
        purchaseable: false,
        showSummary: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get(process.env.REACT_APP_INGREDIENTS_DB_URL)
            .then(res => this.setState({ ingredients : res.data }))
            .catch(error => this.setState( { error: true }));
    }

    updatePurchaseable = (ingredients) => {
        // not using this becaue it will not fetch updated ingredients
        //const ingredients = {...this.state.ingredients}
        const sum = Object.keys(ingredients)
            .map(igKey=> {
                return ingredients[igKey];
            })
            .reduce((sum, el) => sum + el, 0);
        this.setState({purchaseable: sum > 0 });
    }

    // increases particular ingredient by 1 and updates the total price.
    addIngredient = (type) => {
        const updatedCount = this.state.ingredients[type] + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
        this.setState( { totalPrice: newPrice, ingredients: updatedIngredients } );
        // check if atleast one ingredient is added or not. 
        this.updatePurchaseable(updatedIngredients); 
    }

    // decreases particular ingredient by 1 and updates the total price.
    removeIngredient = (type) => {
        const oldCount = this.state.ingredients[type];
        // if current count of the particular ing is 0 then return
        if(oldCount<=0) {
            return;
        }
        const newCount = oldCount - 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = newCount;

        const updatedPrice = this.state.totalPrice -  INGREDIENT_PRICES[type];
        this.setState({ ingredients: updatedIngredients, totalPrice: updatedPrice});
        this.updatePurchaseable(updatedIngredients);
    }

    showSummaryHandler = ()=> {
        this.setState({ showSummary: true });
    }

    cancelSummaryHandler = () => {
        this.setState({ showSummary: false });
    }

    continueSummaryHandler = () => {
        //alert('You can continue!');
        const queryParams = [];
        let ingredients = this.state.ingredients;
        queryParams.push('price=' + this.state.totalPrice);
        for(let ing in ingredients){
            queryParams.push(encodeURIComponent(ing) + "=" + encodeURIComponent(ingredients[ing]));
        }
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }

    render () {
        // takes ingredient and checks if their count is >0
        const disabledInfo = {...this.state.ingredients};
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let burger = this.state.error ? <p>Something went Wrong. Please Hold.</p> : <Spinner />;
        let orderSummary = <Spinner />;
        if(this.state.ingredients){
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls 
                        addedIngredient={this.addIngredient} 
                        removedIngredient={this.removeIngredient} 
                        disabled={disabledInfo}
                        price={this.state.totalPrice}
                        purchase={this.state.purchaseable}
                        clickedOrderNow={this.showSummaryHandler}
                    />
                </Aux>
            );
            orderSummary = <OrderSummary 
                ingredients={this.state.ingredients} 
                cancelOrderSummary={this.cancelSummaryHandler}
                continueOrderSummary={this.continueSummaryHandler}
                orderTotal={this.state.totalPrice}
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

export default WithErrorHandler( BurgerBuilder, axios );