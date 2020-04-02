import React from 'react';
import { Redirect } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';

import Home from 'pages/Home';
import About from 'pages/About';
import Signin from 'pages/Signin';
import Signup from 'pages/Signup';
import Signout from 'pages/Signout';
import RecoverPassword from 'pages/RecoverPassword';
import ChangePassword from 'pages/RecoverPassword/ChangePassword';
import Place from 'pages/Place';
import Route from './Route';

export default function Routes() {
  return (
    <AnimatedSwitch
      atEnter={{ opacity: 0 }}
      atLeave={{ opacity: 0 }}
      atActive={{ opacity: 1 }}
      className="switch-wrapper"
    >
      <Route exact path="/" component={Home} />
      <Route path="/sobre" component={About} />
      <Route path="/entrar" component={Signin} />
      <Route path="/criar-conta" component={Signup} />
      <Route path="/recuperar-senha" component={RecoverPassword} />
      <Route path="/resetar-senha" component={ChangePassword} />
      <Route path="/empresa" component={Place} isPrivate />
      <Route path="/logout" component={Signout} />

      <Route component={() => <Redirect to="/" />} />
    </AnimatedSwitch>
  );
}
