import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import Home from './views/home';
import { history } from './index';

function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/home" exact component={Home} />
        <Redirect from="/" to="home" />
      </Switch>
    </Router>
  );
}

export default App;
