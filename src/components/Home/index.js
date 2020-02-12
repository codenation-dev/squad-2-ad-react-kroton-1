import React, { useEffect, useState } from "react";
import { withAuthorization } from "../Session";
import { withFirebase } from "../Firebase";
import { getReports } from "../../actions/logs";
import { useSelector, useDispatch } from "react-redux";
import {
  List,
  Avatar,
  Select,
  Input,
  Tag,
  Divider,
  BackTop,
  Badge
} from "antd";

import bugImage from "../../images/bug-in-code-vector-12504976.jpg";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import FlipMove from "react-flip-move";

import { uuid } from "uuidv4";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import useFilteredReports from "./useFilteredReports";
import { Box, Grommet, CheckBox, Text, Footer } from "grommet";
import { grommet } from "grommet/themes";

import { options1, options2, options3 } from "../../constants/options";

const Home = ({ firebase }) => {
  const dispatch = useDispatch();
  const reports = useSelector(state => state.rdLogs.logs);
  const { filteredReports, actions } = useFilteredReports(reports);

  let [value, setValue] = useState("");
  let [opt, setOpt] = useState("");
  let [checked, setChecked] = useState(new Map());
  const InputGroup = Input.Group;
  const { Option } = Select;

  useEffect(() => {
    (async function() {
      await dispatch(getReports(firebase));
    })();
  }, []);

  return (
    <Grommet theme={grommet}>
      <div id="content">
        <div class="home-top-content">
          <InputGroup id="input-group" compact>
            <Select defaultValue={0}>
              <Option
                value={0}
                onClick={() => actions.handleFilterByStage(null)}
              >
                Filtrar por
              </Option>
              {options1.map((opt, index) => (
                <Option
                  key={index}
                  value={opt.value}
                  onClick={() => actions.handleFilterByStage(opt.value)}
                >
                  {opt.label}
                </Option>
              ))}
            </Select>
          </InputGroup>

          <InputGroup compact>
            <Select defaultValue={0}>
              <Option value={0} onClick={() => actions.handleOrderBy(null, 2)}>
                Ordenar por
              </Option>
              {options2.map((opt, index) => (
                <Option
                  key={index}
                  value={opt.value}
                  onClick={() => actions.handleOrderBy(opt.value)}
                >
                  {opt.label}
                </Option>
              ))}
            </Select>
          </InputGroup>

          <InputGroup compact>
            <Select defaultValue={0}>
              <Option
                value={0}
                onClick={() => actions.handleSearchByType(null)}
              >
                Buscar por
              </Option>
              {options3.map((opt, index) => (
                <Option
                  key={index}
                  value={opt.value}
                  onClick={() => {
                    setOpt(opt.value);
                  }}
                >
                  {opt.label}
                </Option>
              ))}
            </Select>
          </InputGroup>
          <Input.Search
            placeholder="Pesquisa"
            onChange={e => {
              setValue(e.target.value);
              actions.handleSearchByType(opt, value);
            }}
            onSearch={() => actions.handleSearchByType(opt, value)}
            value={value || ""}
            enterButton
            style={{ width: 300 }}
          />
        </div>

        <div id="list-content">
          {filteredReports.map(item => {
            return (
              <div key={item.id}>
                <List.Item id="hvr-grow">
                  <List.Item.Meta
                    avatar={
                      <Grommet theme={grommet}>
                        <CheckBox
                          checked={checked.get(item.id) || false}
                          onChange={() => {
                            let isChecked =
                              checked.get(item.id) !== undefined
                                ? checked.get(item.id)
                                : false;
                            setChecked(
                              new Map(checked.set(item.id, !isChecked))
                            );
                          }}
                        />
                      </Grommet>
                    }
                    title={item.title}
                    description={item.details}
                  />

                  <Tag>Events: {item.events}</Tag>
                  <Tag
                    color={
                      item.stage === "Production"
                        ? "#6CCD1D"
                        : item.stage === "Development"
                        ? "#FF5647"
                        : "#C541F6"
                    }
                  >
                    {item.stage}
                  </Tag>
                  <Badge
                    style={{ margin: 20, width: 100 }}
                    status={item.type === "debug" ? "success" : item.type}
                    text={item.type}
                    title={item.type}
                  />
                </List.Item>
              </div>
            );
          })}
        </div>
        <Footer background="brand" justify="center" pad="medium">
          <Text textAlign="center" size="small">
            Made with{" "}
            <FontAwesomeIcon
              style={{ marginRight: 5 }}
              icon={faHeart}
              color="#FF5647"
              className="fa-lg"
            />
            by Matheus Cumpian for <b>Kroton </b> and <b>Codenation</b>
          </Text>
        </Footer>
      </div>
    </Grommet>
  );
};

const condition = authUser => !!authUser;
export default withFirebase(withAuthorization(condition)(Home));
