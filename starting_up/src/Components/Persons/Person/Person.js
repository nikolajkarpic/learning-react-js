import matchers from "@testing-library/jest-dom/matchers";
import React, { Component } from "react";
import classes from './Person.module.css';
import WithClass from "../../../hoc/WithClass";
import propTypes from 'prop-types'
import { AuthContext } from '../../../containers/App'

class Person extends Component {
    constructor(props) {
        super(props);
        this.inputElement = React.createRef();
    }
    componentDidMount() {
        if (this.props.position === 0) {
            this.inputElement.current.focus();
        }
    }

    focus() {
        this.inputElement.current.focus();
    }

    render() {
        return (
            <WithClass classes={classes.Person} >
                <AuthContext.Consumer>
                    {auth => auth ? <p>Lol ulogovan si</p> : null}
                </AuthContext.Consumer>
                <p onClick={this.props.click}>I'm {this.props.name} and im {this.props.age} years old!</p>
                <p>{this.props.children}</p>

                <input
                    ref={this.inputElement}
                    type="text"
                    onChange={this.props.changed}
                    value={this.props.name} />
            </WithClass>
        )
    }
};

Person.propTypes = {
    click: propTypes.func,
    name: propTypes.string,
    age: propTypes.number,
    changed: propTypes.func
};

export default Person; // zamoras u radium