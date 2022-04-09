import React, { Component } from "react";
import Aux from "../../hoc/auxilary";
import Burger from "../../components/Burger/Burger";
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHander from "../../hoc/withErrorHandler/withErrorHandler";


const INGEDIENT_PRICES = {
    salad: 50,
    cheese: 40,
    meat: 130,
    bacon: 60
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 40,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get('https://react-burger-builder-25048-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json')
            .then(response => {
                this.setState({ ingredients: response.data });
            })
            .catch(error => { this.setState({ error: true }) });
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    updatePurchasableState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        this.setState({ purchasable: sum > 0 })
    };

    addIngredinetHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredinents = {
            ...this.state.ingredients
        };
        updatedIngredinents[type] = updatedCount;
        const priceAddition = INGEDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredinents });
        this.updatePurchasableState(updatedIngredinents);
    }

    removeIngredinetHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;

        }
        const updatedCount = oldCount - 1;
        const updatedIngredinents = {
            ...this.state.ingredients
        };
        updatedIngredinents[type] = updatedCount;
        const priceDeduction = INGEDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredinents });
        this.updatePurchasableState(updatedIngredinents);
    }

    purchaseCancelHander = () => {
        this.setState({ purchasing: false });
    }
    purchaseContinueHander = () => {
        // alert('YOU CONTINUE!');
        this.setState({ loading: true });
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Nikolaj Karpic',
                address: {
                    street: 'testStreet 1',
                    zipCode: '512312',
                    country: 'serbia'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        };
        axios.post('/orders.json', order)
            .then(response =>
                // console.log(response))
                this.setState({ loading: false, purchasing: false }))
            .catch(error =>
                this.setState({ loading: false, purchasing: false }));
    };



    render() {
        const disabeledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabeledInfo) {
            disabeledInfo[key] = disabeledInfo[key] <= 0;
        }
        let orderSummary = null;


        let burger = this.state.error ? <p> ingredient cannot be loaded</p> : <Spinner />
        if (this.state.ingredients) {
            burger = (<>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredinetHandler}
                    ingredientRemoved={this.removeIngredinetHandler}
                    disabled={disabeledInfo}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}
                    price={this.state.totalPrice} />
            </>);

            orderSummary = <OrderSummary
                price={this.state.totalPrice}
                ingredients={this.state.ingredients}
                purchaseCanceled={this.purchaseCancelHander}
                purchaseContinue={this.purchaseContinueHander} />
        }
        if (this.state.loading) {
            orderSummary = <Spinner />;
        }


        return (
            <Aux>
                <Modal
                    modalClosed={this.purchaseCancelHander}
                    show={this.state.purchasing}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux >
        );
    }
}

export default withErrorHander(BurgerBuilder, axios);