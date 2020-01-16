import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { FirebaseContext } from '../Firebase';
import * as ROUTES from '../../constants/routes';


/*ANT DESIGN */
import {Form, Input, Button} from 'antd';

const SignUpPage = () => (

  <div id='signUpPage'>
    <h1>Cadastro</h1>
    <FirebaseContext.Consumer>
      {firebase => <SignUpForm firebase={firebase} />}
    </FirebaseContext.Consumer>
  </div>

);

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};


class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE};
  }


  onSubmit = event => {
    const { username, email, passwordOne } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
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

    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
    passwordOne !== passwordTwo ||
    passwordOne === '' ||
    email === '' ||
    username === '';

    return (
      <Form style={{maxWidth: '300px'}} onSubmit={this.onSubmit}>
        <Input
          style={{marginTop: '25px'}}
          name="username"
          value={username}
          onChange={this.onChange}
          type="text"
          placeholder="Nome Completo"
        />
        <Input
          style={{marginTop: '25px'}}
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="E-Mail"
        />
        <Input
          style={{marginTop: '25px'}}
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="Senha"
        />
        <Input
          style={{marginTop: '25px'}}
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirme a senha"
        />
        <Button style={{width: '100%', marginTop: '25px'}} disabled={isInvalid} type='primary' htmlType="submit">Cadastrar</Button>
        {error && <p>{error.message}</p>}
      </Form>
    );
  }
}

const SignUpForm = withRouter(SignUpFormBase);


const SignUpLink = () => (
  <p style={{marginTop: '25px'}}>
   Não tem uma conta ? <Link style={{}} to={ROUTES.SIGN_UP}>Cadastre-se</Link>
  </p>
);

export default SignUpPage;
export { SignUpForm, SignUpLink };