import React from "react";
import { Link } from "react-router-dom";
import SignOutButton from "../SignOut";
import * as ROUTES from "../../constants/routes";
import { AuthUserContext } from "../Session";

import { Layout, Menu } from "antd";

const { Header } = Layout;

const Navigation = ({ authUser }) => (
  <Header style={{ height: "32px" }}>
    <div className="logo" />
    <AuthUserContext.Consumer>
      {authUser => (authUser ? <NavigationAuth /> : <NavigationNonAuth />)}
    </AuthUserContext.Consumer>
  </Header>
);

const NavigationAuth = () => (
  <Menu theme="dark" mode="horizontal" style={{ lineHeight: "32px" }}>
    <Menu.Item key="1">
      {" "}
      <Link to={ROUTES.HOME}>Inicio</Link>{" "}
    </Menu.Item>
    <Menu.Item key="2">
      {" "}
      <Link to={ROUTES.ACCOUNT}>Minha Conta</Link>{" "}
    </Menu.Item>
    <Menu.Item key="3">
      {" "}
      <SignOutButton />{" "}
    </Menu.Item>
  </Menu>
);
const NavigationNonAuth = () => (
  <Menu theme="dark" mode="horizontal" style={{ lineHeight: "32px" }}>
    <Menu.Item key="1">
      {" "}
      <Link to={ROUTES.SIGN_IN}>Login</Link>{" "}
    </Menu.Item>
  </Menu>
);
export default Navigation;
