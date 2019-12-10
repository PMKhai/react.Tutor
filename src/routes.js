import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import RouteWithLayout from './components/RouteWithLayout';
import NormalLayout from './layouts/normal';
import Home from './views/home';
import SignIn from './views/signin';
import SignUp from './views/singup';
import Profile from './views/profile';
import ShowProfile from './views/showprofile';
import TutorListing from './views/tutorlisting';

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
    <RouteWithLayout
      component={SignUp}
      exact
      layout={NormalLayout}
      path="/signup"
    />
    <RouteWithLayout
      component={Profile}
      exact
      layout={NormalLayout}
      path="/profile"
    />
    <RouteWithLayout
      component={ShowProfile}
      exact
      layout={NormalLayout}
      path="/view"
    />
    <RouteWithLayout
      component={TutorListing}
      exact
      layout={NormalLayout}
      path="/tutor/all"
    />
    <Redirect exact from="/" to="home" />
  </Switch>
);

export default Routes;
