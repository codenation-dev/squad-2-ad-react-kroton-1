import React, { useEffect, Fragment } from "react";
import { withAuthorization } from "../Session";
import { withFirebase } from "../Firebase";
import { getReports } from "../../actions/logs";
import { useSelector, useDispatch } from "react-redux";
import { List, Avatar, Select, Input } from "antd";

import useFilteredReports from "./useFilteredReports";

import { options1, options2, options3 } from "../../constants/options";

const Home = ({ firebase }) => {
  const dispatch = useDispatch();
  const reports = useSelector(state => state.rdLogs.logs);
  const { filteredReports, actions } = useFilteredReports(reports);

  const InputGroup = Input.Group;
  const { Option } = Select;

  useEffect(() => {
    (async function() {
      await dispatch(getReports(firebase));
    })();
  }, []);

  return (
    <Fragment>
      <InputGroup compact>
        <Select defaultValue={0}>
          <Option value={0} onClick={() => actions.handleFilterByStage(null)}>
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
          <Option value={0} onClick={() => actions.handleSearchByType(null)}>
            Selecione o filtro 2
          </Option>
          {options3.map((opt, index) => (
            <Option
              key={index}
              value={opt.value}
              onClick={() => actions.handleSearchByType(opt.value)}
            >
              {opt.label}
            </Option>
          ))}
        </Select>
      </InputGroup>

      <List
        dataSource={filteredReports}
        renderItem={item => (
          <List.Item key={item.id}>
            <List.Item.Meta
              avatar={
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              }
              title={<a href="https://ant.design">{item.title}</a>}
              description={item.details}
            />
            <div>Content</div>
          </List.Item>
        )}
      ></List>
    </Fragment>
  );
};

const condition = authUser => !!authUser;
export default withFirebase(withAuthorization(condition)(Home));
