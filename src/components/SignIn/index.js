import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { SignUpLink } from "../SignUp";
import { withFirebase } from "../Firebase";
import { login } from "../../actions/users";

/* ANT DESIGN */
import { Button, Input, Form, Icon } from "antd";
import { PasswordForgetLink } from "../PasswordForget";

const SignInPage = () => (
  <div id="signInPage">
    <h1>Login</h1>
    <SignInForm />
    <SignUpLink />
    <PasswordForgetLink />
  </div>
);
const loginData = {
  email: "",
  password: "",
  error: null
};

const SignInFormBase = ({ firebase }) => {
  const [loginUser, setLoginUser] = useState({ ...loginData });

  const onSubmit = async event => {
    if (event) event.preventDefault();
    if (loginUser.email && loginUser.password) {
      const response = await login(firebase, loginUser);
      if (response) setLoginUser({ ...loginData });
    }
  };

  const isInvalid = !loginUser.email || !loginUser.password;

  return (
    <Form
      className="loginForm"
      style={{ maxWidth: "300px" }}
      onSubmit={onSubmit}
    >
      <Input
        prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
        style={{ marginTop: "25px" }}
        name="email"
        value={loginUser.email}
        onChange={evt =>
          setLoginUser({ ...loginUser, email: evt.target.value })
        }
        type="text"
        placeholder="E-mail"
      />
      <Input
        prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
        style={{ marginTop: "25px" }}
        name="password"
        value={loginUser.password}
        onChange={evt =>
          setLoginUser({ ...loginUser, password: evt.target.value })
        }
        type="password"
        placeholder="Senha"
      />
      <Button
        id="loginButton"
        style={{ width: "100%" }}
        disabled={isInvalid}
        htmlType="submit"
        type="primary"
      >
        Entrar
      </Button>
    </Form>
  );
};

const SignInForm = compose(withRouter, withFirebase)(SignInFormBase);
export default SignInPage;
export { SignInForm };
