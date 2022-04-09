import React from 'react';
import classes from './MenuButton.module.css'


const MenuButton = (props) => (
    <div className={classes.MenuButton}>
        <div className={classes.Button} onClick={props.openMenu}>

            <div className={classes.Div}></div>
            <div className={classes.Div}></div>
            <div className={classes.Div}></div>
        </div>
    </div>
);

export default MenuButton;