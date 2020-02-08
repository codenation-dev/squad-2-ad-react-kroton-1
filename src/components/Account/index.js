import React from 'react';
import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';
import {AuthUserContext, withAuthorization } from '../Session';
const AccountPage = () => (
<AuthUserContext.Consumer>
    {authUser => (
      <div id='accountPage'>
        <h1>Usuário: {authUser.email}</h1>
        <PasswordChangeForm />
      </div>
    )}
  </AuthUserContext.Consumer>
);
const condition = authUser => !!authUser;
export default withAuthorization(condition)(AccountPage);