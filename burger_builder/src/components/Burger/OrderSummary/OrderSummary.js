import React, { Component } from 'react';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    //DEbbuging purposes... this can be functional component
    componentWillUpdate() {
        console.log('[order summary will updat]');
    }

    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
            .map(igKey => {
                return (
                    <li key={igKey}>
                        <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {this.props.ingredients[igKey]}
                    </li>
                )
            });
        return (
            <>
                <h3>Your orded</h3>
                <p>A delicious burger with folowing ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p>Total price is: <strong>{this.props.price.toFixed(2)}</strong> dinara!</p>
                <p>Continue to checkout?</p>
                <Button buttonType="Danger" clicked={this.props.purchaseCanceled}>CANCEL</Button>
                <Button buttonType="Success" clicked={this.props.purchaseContinue}>CONTINUE</Button>
            </>
        );
    };
};

export default OrderSummary;