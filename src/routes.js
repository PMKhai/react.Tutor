import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import RouteWithLayout from './components/RouteWithLayout';
import NormalLayout from './layouts/normal';
import Home from './views/home';
import SignIn from './views/signin';

const Routes = () => (
  <Switch>
    <RouteWithLayout
      component={Home}
      exact
      layout={NormalLayout}
      path="/home"
    />
    <RouteWithLayout
      component={SignIn}
      exact
      layout={NormalLayout}
      path="/signin"
    />
    <Redirect exact from="/" to="home" />
  </Switch>
);

export default Routes;
