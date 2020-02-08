import React from 'react';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { Link } from 'react-router-dom';
import {Menu} from 'antd';

const SignOutButton = ({ firebase }) => (
     <Menu.Item key='3' onClick={firebase.doSignOut} > <Link  to={ROUTES.SIGN_IN}>Sair</Link>  </Menu.Item>
);

export default withFirebase(SignOutButton);