import React from "react";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";
import { Link } from "react-router-dom";
import { Anchor } from "grommet";

const SignOutButton = ({ firebase }) => (
  <Link to={ROUTES.SIGN_IN}>
    <Anchor onClick={firebase.doSignOut} label={"SAIR"} key={"SAIR"} />
  </Link>
);

export default withFirebase(SignOutButton);
