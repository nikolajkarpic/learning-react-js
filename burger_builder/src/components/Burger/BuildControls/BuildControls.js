import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' }
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current price: <strong>{props.price.toFixed(2)} </strong>dinara.</p>
        {controls.map(cntl => (
            <BuildControl
                key={cntl.label}
                label={cntl.label}
                added={() => props.ingredientAdded(cntl.type)}
                removed={() => props.ingredientRemoved(cntl.type)}
                disabled={props.disabled[cntl.type]} />
        ))}
        <button
            className={classes.OrderButton}
            disabled={!props.purchasable}
            onClick={props.ordered}>ORDER NOW</button>
    </div>
);

export default buildControls;