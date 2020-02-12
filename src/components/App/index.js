import React from "react";
import { Route } from "react-router-dom";
import Navigation from "../Navigation";
import SignUpPage from "../SignUp";
import SignInPage from "../SignIn";
import PasswordForgetPage from "../PasswordForget";
import HomePage from "../Home";
import AccountPage from "../Account";
import * as ROUTES from "../../constants/routes";
import { withAuthentication } from "../Session";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => (
  // <Router>
  <div id="mainDiv">
    <Navigation />
    <ToastContainer />
    <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
    <Route exact path={ROUTES.SIGN_IN} component={SignInPage} />
    <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
    <Route path={ROUTES.HOME} component={HomePage} />
    <Route path={ROUTES.ACCOUNT} component={AccountPage} />
  </div>
  // </Router>
);
export default withAuthentication(App);
