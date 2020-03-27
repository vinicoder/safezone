import React from 'react';
import { BrowserRouter, Switch, Redirect } from 'react-router-dom';

import Home from 'pages/Home';
import About from 'pages/About';
import Signin from 'pages/Signin';
import Signup from 'pages/Signup';
import RecoverPassword from 'pages/RecoverPassword';
import Place from 'pages/Place';
import Route from './Route';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/sobre" component={About} />
        <Route path="/entrar" component={Signin} />
        <Route path="/criar-conta" component={Signup} />
        <Route path="/recuperar-conta" component={RecoverPassword} />
        <Route path="/empresa" component={Place} />

        <Route component={() => <Redirect to="/" />} />
      </Switch>
    </BrowserRouter>
  );
}
