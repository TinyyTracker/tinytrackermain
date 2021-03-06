import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Items from "./pages/Items";
import Signin from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import Detail from "./pages/Detail";
import SignUp from "./pages/SignUp";
import PasswordForget from "./pages/PasswordForget";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

import withAuthentication from './components/Authentication';

import * as routes from './constants/routes';

const App = () =>
  <Router>
    <div className="Maaaaaaaad buttcheeks">
      <Switch>
        <Route exact path={routes.SIGN_IN} component={Signin} />
        <Route exact path={routes.SIGN_UP} component={SignUp} />
        <Route exact path={routes.PASSWORDFORGET} component={PasswordForget} />
        <Route exact path={routes.ITEMS} component={Items} />
        <Route exact path={routes.DASHBOARD} component={Dashboard} />
        <Route exact path={routes.DETAIL} component={Detail} />
        <Route component={NoMatch} />
      </Switch>
      <Footer />
    </div>
  </Router>;

export default withAuthentication(App);

