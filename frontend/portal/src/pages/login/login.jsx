import React, { useState } from "react";
import clsx from 'clsx';
import { Link } from "react-router-dom";

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper, 
  Input,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
  Button
} from '@material-ui/core';
import { Visibility, VisibilityOff, Email, Send } from '@material-ui/icons';

// imgs
import Logo from '../../assets/img/logo.png';

// styles
import '../../assets/styles/login.css';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: 200,
  },
  button: {
    backgroundColor:'#6a1b9a',
    color:'#f1f1f1',
    marginTop:'1rem'
  },
  invisibleLink: {
    textDecoration: 'none'
  }
}));

export default () => {
  
  const classes = useStyles();
  const [values, setValues] = useState({
    email: '',
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  return (
    <div className="container">
      <div className="login z-depth-5">
        <Paper className="paper">
          <section id="header">
            <img src={Logo} alt="Logo" />
            <h1 id="brand">Central de Erros</h1>
            <h1 id="login-header">login</h1>
          </section>

          <form method="post" action="">
            <div className="row">
            <FormControl className={clsx(classes.margin, classes.textField)}>
              <InputLabel htmlFor="input-with-icon-adornment">Email</InputLabel>
              <Input
                id="standard-with-icon-adornment-email"
                type='email'
                value={values.email}
                onChange={handleChange('email')}
                endAdornment={
                  <InputAdornment position="end">
                    <Email className="email-icon" />
                  </InputAdornment>
                }
              />
            </FormControl>
            </div>
            <div className="row">
            <FormControl className={clsx(classes.margin, classes.textField)}>
              <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
              <Input
                id="standard-adornment-password"
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange('password')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showPassword ? <Visibility className="password-icon"/> : <VisibilityOff className="password-icon"/>}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            </div>
          </form>
          <div className="login-help">
            <Button
              variant="contained"
              className={classes.button}
              endIcon={<Send />}
              style={{backgroundColor:'#6a1b9a', color:'#f1f1f1', marginTop:'1rem'}}
            >
              Login
            </Button>
            <Link className={classes.invisibleLink} to="/cadastro">
              <Button
                variant="contained"
                className={classes.button}
                style={{backgroundColor:'#6a1b9a', color:'#f1f1f1', marginTop:'1rem'}}
              >
                Cadastro
              </Button>
            </Link>
            <p><a href="recuperarSenha.html">Esqueci a senha</a></p>
          </div>
        </Paper>
      </div>
    </div>
  );
}
