import React, {
  Component
} from 'react';
import logo from '../logo.svg';
import classes from './App.module.css';
import Person from '../Components/Persons/Person/Person';
import Persons from '../Components/Persons/Persons'
import Cockpit from '../Components/Cockpit/Cockpit';
import ErrorBoundary from '../Components/ErrorBoundary/ErrorBoundary';
import WithClass from '../hoc/WithClass';

export const AuthContext = React.createContext(false);

class App extends Component {
  constructor(props) {
    super(props);
    console.log('App.js: inside constructor', props)
    this.state = {
      persons: [{
        id: 'asda',
        name: "Nico",
        age: 23
      },
      {
        id: 'asdga',
        name: "Don",
        age: 53
      },
      {
        id: '124ds',
        name: "Lol",
        age: 43
      },
      {
        id: 'sdkjnfkl',
        name: "Heh",
        age: 33
      },
      ],
      otherState: 'Nesto drugo',
      showPersons: false,
      toggleClicked: 0,
      authenticated: false
    }
  }




  loginHandler = () => {
    this.setState({ authenticated: true });
  }


  // state = {
  //   persons: [
  //     { id: 'asda', name: "Nico", age: 23 },
  //     { id: 'asdga', name: "Don", age: 53 },
  //     { id: '124ds', name: "Lol", age: 43 },
  //     { id: 'sdkjnfkl', name: "Heh", age: 33 },
  //   ],
  //   otherState: 'Nesto drugo',
  //   showPersons: false
  // }

  deletePersonHandler = (personIndex) => {
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({
      persons: persons
    });
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };

    // const person = Object.assign({}, this.state.persons[personIndex]);

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({
      persons: persons
    });
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState((prevState, props) => {
      return {
        showPersons: !doesShow,
        toggleClicked: prevState.toggleClicked + 1
      }
    });
  }

  render() {

    let persons = null;


    if (this.state.showPersons) {
      persons = (
        <div >
          <Persons persons={this.state.persons}
            clicked={this.deletePersonHandler}
            changed={this.nameChangedHandler}
          /> </div>
      );


    }

    return (
      <WithClass classes={
        classes.App} >
        <Cockpit
          propsTitle={this.props.title}
          showPersons={this.state.showPersons}
          persons={this.state.persons}
          clicked={this.togglePersonsHandler}
          login={this.loginHandler}

        />
        <AuthContext.Provider value={this.state.authenticated}>
          {persons}
        </AuthContext.Provider>
      </WithClass>
    );
  }
}

export default App;