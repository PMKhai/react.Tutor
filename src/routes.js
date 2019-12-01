import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import RouteWithLayout from './components/RouteWithLayout';
import NormalLayout from './layouts/normal';
import Home from './views/home';

const Routes = () => (
  <Switch>
    <RouteWithLayout
      component={Home}
      exact
      layout={NormalLayout}
      path="/home"
    />
    <Redirect exact from="/" to="home" />
  </Switch>
);

export default Routes;
