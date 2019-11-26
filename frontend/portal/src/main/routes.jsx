import React, { Component } from "react";
import { Redirect, Route, Switch, HashRouter } from "react-router-dom";

import Login from '../pages/login/login';
import Cadastro from '../pages/login/cadastro';
import Home from '../pages/home/home';

class Routes extends Component {

  render() {
    return (
      <HashRouter>
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/cadastro" component={Cadastro} />

          <Redirect from="*" to="/login" />
        </Switch>
      </HashRouter>
    );
  }
}

export default Routes;
