import React, { useEffect, useState } from "react";
import { withAuthorization } from "../Session";
import { withFirebase } from "../Firebase";
import { getReports, excludeReports, archiveReports } from "../../actions/logs";
import { useSelector, useDispatch } from "react-redux";
import {
  List,
  Select,
  Input,
  Tag,
  Badge,
  Drawer,
  Descriptions,
  Switch,
  Icon
} from "antd";

import useFilteredReports from "./useFilteredReports";
import { Grommet, CheckBox, Button, Box, Paragraph } from "grommet";
import { grommet } from "grommet/themes";
import {
  faArchive,
  faTrash,
  faInfoCircle
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { options1, options2, options3 } from "../../constants/options";

const Home = ({ firebase }) => {
  const dispatch = useDispatch();
  const reports = useSelector(state => state.rdLogs.logs);
  const { filteredReports, actions } = useFilteredReports(reports);

  let [value, setValue] = useState("");
  let [opt, setOpt] = useState("");
  let [checked, setChecked] = useState(new Map());
  let [visible, setVisible] = useState(false);
  let [showArchived, setShowArchived] = useState(false);

  let [detailsObject, setDetailsObject] = useState({});

  const InputGroup = Input.Group;
  const { Option } = Select;

  function onClose() {
    setVisible(false);
  }

  useEffect(() => {
    (async function() {
      await dispatch(getReports(firebase));
    })();
  }, []);

  useEffect(() => {
    actions.handleSearchByType(opt, value);
    actions.handleShowArchived(showArchived);
  }, [value, opt, showArchived, detailsObject]);

  return (
    <Grommet id="content" theme={grommet}>
      <div className="home-top-content">
        <InputGroup id="input-group" compact>
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
          onChange={async e => {
            setValue(e.target.value);
          }}
          onSearch={() => actions.handleSearchByType(opt, value)}
          value={value || ""}
          enterButton
          style={{ width: 300 }}
          width="300"
        />
        <Box
          direction="row"
          height="40px"
          width="small"
          align="center"
          justify="center"
          pad="small"
          gap="small"
          alignSelf="center"
        >
          <Button
            primary
            color="accent-4"
            icon={<FontAwesomeIcon icon={faArchive} color="#C541F6" />}
            label={!showArchived ? "Arquivar" : "Desarquivar"}
            onClick={async () => {
              await dispatch(archiveReports(firebase, checked, showArchived));
              setChecked(new Map());
            }}
            disabled={
              Array.from(checked.values()).some(element => element)
                ? false
                : true
            }
          />
        </Box>
        <Box
          direction="row"
          height="40px"
          width="small"
          align="center"
          justify="center"
          pad="small"
          gap="small"
          alignSelf="center"
        >
          <Button
            primary
            color="#FF4040"
            icon={<FontAwesomeIcon icon={faTrash} color="#f1f1f1" />}
            label="Excluir"
            onClick={async () => {
              await dispatch(excludeReports(firebase, checked));
              setChecked(new Map());
            }}
            disabled={
              Array.from(checked.values()).some(element => element)
                ? false
                : true
            }
          />
        </Box>
      </div>

      <div id="list-content">
        <Box
          direction="row"
          height="40px"
          width="small"
          align="center"
          justify="center"
          pad="small"
          gap="small"
          alignSelf="center"
        >
          <Paragraph margin="xsmall">Arquivados</Paragraph>
          <Switch
            checkedChildren={<Icon type="check" />}
            unCheckedChildren={<Icon type="close" />}
            checked={showArchived}
            onChange={() => setShowArchived(!showArchived)}
          />
        </Box>
        {filteredReports.map(item => {
          return (
            <div key={item.realId}>
              <List.Item id="hvr-grow">
                <List.Item.Meta
                  avatar={
                    <Grommet theme={grommet}>
                      <CheckBox
                        checked={checked.get(item.realId) || false}
                        onChange={() => {
                          let isChecked =
                            checked.get(item.realId) !== undefined
                              ? checked.get(item.realId)
                              : false;
                          setChecked(
                            new Map(checked.set(item.realId, !isChecked))
                          );
                        }}
                      />
                    </Grommet>
                  }
                  title={item.title}
                  description={item.details.substring(0, 30) + "..."}
                />

                <Tag>Events: {item.events}</Tag>
                <Tag
                  color={
                    item.stage === "Production"
                      ? "#00C781"
                      : item.stage === "Development"
                      ? "#FF4040"
                      : "#3D138D"
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
                <Box
                  direction="row"
                  height="40px"
                  width="small"
                  align="center"
                  justify="center"
                  pad="small"
                  gap="small"
                  alignSelf="center"
                >
                  {" "}
                  <Button
                    primary
                    color="brand"
                    icon={
                      <FontAwesomeIcon icon={faInfoCircle} color="#6FFFB0" />
                    }
                    label="Detalhes"
                    onClick={async () => {
                      let object = await filteredReports.find(
                        element => element.realId === item.realId
                      );
                      setDetailsObject(object);
                      setVisible(true);
                    }}
                  />
                </Box>
              </List.Item>
            </div>
          );
        })}
      </div>
      <Drawer
        width={1280}
        title="Detalhes"
        placement="right"
        closable={true}
        onClose={() => onClose()}
        visible={visible}
      >
        <Descriptions title="Detalhes do erro" bordered>
          <Descriptions.Item label="Origem">
            {detailsObject.origin}
          </Descriptions.Item>
          <Descriptions.Item label="Estágio">
            {
              <Tag
                color={
                  detailsObject.stage === "Production"
                    ? "#00C781"
                    : detailsObject.stage === "Development"
                    ? "#FF4040"
                    : "#3D138D"
                }
              >
                {detailsObject.stage}
              </Tag>
            }
          </Descriptions.Item>
          <Descriptions.Item label="Eventos">
            <Tag>{detailsObject.events}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Data do erro">
            {detailsObject.date}
          </Descriptions.Item>
          <Descriptions.Item label="Coletado por" span={2}>
            {detailsObject.collectedBy}
          </Descriptions.Item>
          <Descriptions.Item label="Status" span={3}>
            <Badge
              style={{ margin: 20, width: 100 }}
              status={
                detailsObject.type === "debug" ? "success" : detailsObject.type
              }
              text={detailsObject.type}
              title={detailsObject.type}
            />
          </Descriptions.Item>
          <Descriptions.Item label="Detalhes do erro">
            {detailsObject.details}
          </Descriptions.Item>
        </Descriptions>
        ,
      </Drawer>
    </Grommet>
  );
};

const condition = authUser => !!authUser;
export default withFirebase(withAuthorization(condition)(Home));
