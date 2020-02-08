import React, { useState, useEffect, Fragment } from "react";
import { withAuthorization } from "../Session";
import { withFirebase } from "../Firebase";
import { getReports } from "../../actions/logs";
import { useSelector, useDispatch } from "react-redux";
import { List, Avatar, Select, Input } from "antd";
import { options1, options2, options3 } from "../../constants/options";

const Home = ({ firebase }) => {
  const [filters, setFilters] = useState([]);
  const [reportsClone, setReportsClone] = useState([]);
  const reports = useSelector(state => state.rdLogs.logs);
  const dispatch = useDispatch();

  const InputGroup = Input.Group;
  const { Option } = Select;

  useEffect(() => {
    (async function() {
      await dispatch(getReports(firebase));
    })();
  }, []);

  useEffect(() => {
    // se tiver algo selecionado, filtrar antes de setar novo array
    setReportsClone([...reports]);
  }, [reports]);

  const selectOption = (option, select) => {
    if (!option) {
    }
    const filtersCurrent = [...filters];

    filtersCurrent.push({
      select,
      option
    });
    setFilters(filtersCurrent);
  };

  return (
    <Fragment>
      <InputGroup compact>
        <Select defaultValue={0}>
          <Option value={0} onClick={() => selectOption(null, 1)}>
            Selecione o filtro
          </Option>
          {options1.map((opt, index) => (
            <Option
              key={index}
              value={opt.value}
              onClick={() => selectOption(opt.value, 1)}
            >
              {opt.label}
            </Option>
          ))}
        </Select>
      </InputGroup>
      <InputGroup compact>
        <Select defaultValue={0}>
          <Option value={0} onClick={() => selectOption(null, 2)}>
            Selecione o filtro 2
          </Option>
          {options2.map((opt, index) => (
            <Option
              key={index}
              value={opt.value}
              onClick={() => selectOption(opt.value, 2)}
            >
              {opt.label}
            </Option>
          ))}
        </Select>
      </InputGroup>
      <InputGroup compact>
        <Select defaultValue={0}>
          <Option value={0} onClick={() => selectOption(null, 3)}>
            Selecione o filtro 2
          </Option>
          {options3.map((opt, index) => (
            <Option
              key={index}
              value={opt.value}
              onClick={() => selectOption(opt.value, 3)}
            >
              {opt.label}
            </Option>
          ))}
        </Select>
      </InputGroup>

      <List
        dataSource={reportsClone}
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
