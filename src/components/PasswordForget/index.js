import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

/* Ant Design */
import {Form, Input, Button} from 'antd';

const PasswordForgetPage = () => (
  <div id="passwordForgetPage">
    <h1>Esqueci minha senha</h1>
    <PasswordForgetForm />
  </div>
);

const INITIAL_STATE = {
  email: '',
  error: null,
};

class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email } = this.state;
    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
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
    const { email, error } = this.state;
    const isInvalid = email === '';
    return (
      <Form style={{maxWidth: '300px'}} onSubmit={this.onSubmit}>
        <Input
          style={{marginTop: '25px'}}
          name="email"
          value={this.state.email}
          onChange={this.onChange}
          type="text"
          placeholder="E-mail cadastrado"
        />
        <Button style={{width: '100%', marginTop: '25px'}} disabled={isInvalid} type='primary' htmlType="submit">
          Mudar a senha
        </Button>
        {error && <p>{error.message}</p>}
      </Form>
    );
  }
}

const PasswordForgetLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_FORGET}>Esqueceu a senha?</Link>
  </p>
);

export default PasswordForgetPage;
const PasswordForgetForm = withFirebase(PasswordForgetFormBase);
export { PasswordForgetForm, PasswordForgetLink };