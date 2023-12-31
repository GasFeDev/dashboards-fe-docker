import { useState } from "react";
import { Layout, Col, Row, Menu, MenuProps } from "antd";
import { MENU } from "../../constants";

import "./AppHeader.css";

const { Header } = Layout;

const items = MENU.map((item: { label: string; link: string }) => {
  return {
    key: `${item.link}`,
    label: `${item.label}`,
    link: `${item.link}`,
  };
});

export const AppHeader = ({ ...props }) => {
  const [current, setCurrentKey] = useState("rewards");

  const onClickMenu: MenuProps["onClick"] = (e) => {
    setCurrentKey(e.key);
  };

  return (
    <Header style={{ top: 0, zIndex: 1, width: "100%" }}>
      <Row justify="center" align="middle">
        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
        </Col>
        <Col className="col-aligment" xs={12} sm={12} md={12} lg={12} xl={12}>
          <Menu
            className="expanded-menu"
            mode="horizontal"
            defaultSelectedKeys={[current]}
          >
            {items.map((item, index) => {
              return (
                <Menu.Item key={`${item?.key}_${index}`} onClick={onClickMenu}>
                  <a
                    href="https://dashboards-fe-docker.onrender.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {item.label}
                  </a>
                </Menu.Item>
              );
            })}
          </Menu>
        </Col>
      </Row>
    </Header>
  );
};
