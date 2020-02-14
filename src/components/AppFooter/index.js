import React from "react";

import { withAuthentication } from "../Session";

import { Grommet, Text, Footer } from "grommet";
import { grommet } from "grommet/themes";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AppFooter = props => {
  return props.firebase.auth.currentUser ? (
    <Grommet theme={grommet}>
      <Footer
        id="content-footer"
        background="brand"
        justify="center"
        pad="medium"
      >
        <Text textAlign="center" size="small">
          Feito com
          <FontAwesomeIcon
            style={{ marginRight: 5, marginLeft: 5 }}
            icon={faHeart}
            color="#FF5647"
            className="fa-lg"
          />
          por SQUAD 2 para <b>Kroton </b> e <b>Codenation</b>
        </Text>
      </Footer>
    </Grommet>
  ) : null;
};

export default withAuthentication(AppFooter);
