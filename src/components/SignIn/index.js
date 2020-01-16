import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { SignUpLink } from '../SignUp';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';


/* ANT DESIGN */
import {Button, Input, Form, Layout, Menu, Icon} from 'antd';
import { PasswordForgetLink } from '../PasswordForget';


const SignInPage = () => (
  <div id="signInPage">
    <h1>Login</h1>
    <SignInForm />
    <SignUpLink />
    <PasswordForgetLink/>
  </div>
);
const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};
class SignInFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }
  onSubmit = event => {
    const { email, password } = this.state;
    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });
    event.preventDefault();
  };
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    
    const { email, password, error } = this.state;
    const isInvalid = password === '' || email === '';
    return (
      <Form className='loginForm' style={{maxWidth: '300px'}} onSubmit={this.onSubmit}>
        <Input
          prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
          style={{marginTop: '25px'}}
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="E-mail"
        />
        <Input
          prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}  
          style={{marginTop: '25px'}}
          name="password"
          value={password}
          onChange={this.onChange}
          type="password"
          placeholder="Senha"
        />
        <Button id="loginButton" style={{width: '100%'}} disabled={isInvalid} htmlType="submit" type='primary'>
          Entrar
        </Button>
        {error && <p>{error.message}</p>}
      </Form>
    );
  }
}
const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);
export default SignInPage;
export { SignInForm };