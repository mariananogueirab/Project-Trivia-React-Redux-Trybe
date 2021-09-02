import React from 'react';
import { Route, Switch } from 'react-router-dom';
import logo from './trivia.png';
import './App.css';
import Login from './pages/Login';
<<<<<<< HEAD
import Settings from './pages/Settings';
=======
>>>>>>> ae0837a9b8a2043f5b87b3ea50005a378835b2a5

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
        </header>
        <Switch>
          <Route exact path="/" component={ Login } />
<<<<<<< HEAD
          <Route exact path="/settings" component={ Settings } />
=======
>>>>>>> ae0837a9b8a2043f5b87b3ea50005a378835b2a5
        </Switch>
      </div>
    );
  }
}
