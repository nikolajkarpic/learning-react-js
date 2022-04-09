import React from "react";
import classes from './cockpit.module.css'
import Aux from '../../hoc/Auxilary'

const Cockpit = (props) => {

    let btnClass = classes.Button;

    if (props.showPersons) {
        btnClass = [classes.Button, classes.Red].join(' ');
    }

    let assignedClasses = [];

    if (props.persons.length <= 2) {
        assignedClasses.push(classes.red);
    }
    if (props.persons.length <= 1) {
        assignedClasses.push(classes.bold);
    }
    return (
        <Aux>
            <h1>{props.propsTitle}</h1>
            <p className={assignedClasses.join(' ')}>lolcina</p>
            <button className={btnClass}
                onClick={props.clicked}>Toggle persons</button>
            <button onClick={props.login}>Log in</button>
        </Aux>
    );
};

export default Cockpit;