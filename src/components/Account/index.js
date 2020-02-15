import React from "react";
import PasswordChangeForm from "../PasswordChange";
import { AuthUserContext, withAuthorization } from "../Session";
const AccountPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div id="accountPage">
        <h1>Usuário: {authUser.email}</h1>
        <h2>Mudança de senha</h2>
        <PasswordChangeForm />
      </div>
    )}
  </AuthUserContext.Consumer>
);
const condition = authUser => !!authUser;
export default withAuthorization(condition)(AccountPage);
