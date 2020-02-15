import React from "react";
import { Link } from "react-router-dom";
import SignOutButton from "../SignOut";
import * as ROUTES from "../../constants/routes";
import { withAuthentication } from "../Session";

import { uuid } from "uuidv4";

import { Avatar } from "antd";

import { Anchor, Box, Grommet, Header, Nav } from "grommet";
import { grommet } from "grommet/themes";

import logo from "../../images/test.png";

const Navigation = props => {
  return props.firebase.auth.currentUser ? <NavigationAuth /> : null;
};

const items = [{ label: "MINHA CONTA", href: ROUTES.ACCOUNT }];

const NavigationAuth = () => (
  <Grommet theme={grommet}>
    <Header background="light" pad="medium">
      <Box
        hoverIndicator="true"
        animation="slideRight"
        direction="row"
        align="center"
        gap="small"
      >
        <Link to={ROUTES.HOME}>
          <Anchor color="white">
            <img style={{ width: 150, height: 50 }} src={logo}></img>
          </Anchor>
        </Link>
      </Box>
      <Box animation="slideLeft" direction="row" align="end" gap="medium">
        <Avatar
          size={64}
          src={`https://avatars.dicebear.com/v2/avataaars/${uuid()}.svg`}
        ></Avatar>
        <Nav direction="row">
          {items.map(item => (
            <Link to={item.href}>
              <Anchor label={item.label} key={item.label} />
            </Link>
          ))}
          <SignOutButton />
        </Nav>
      </Box>
    </Header>
  </Grommet>
);

export default withAuthentication(Navigation);
