import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';
import Signin from './pages/Signin';
import Signup from './pages/Signup';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/sobre" component={About} />
        <Route path="/entrar" component={Signin} />
        <Route path="/criar-conta" component={Signup} />
      </Switch>
    </BrowserRouter>
  );
}
