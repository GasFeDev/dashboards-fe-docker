import React from "react";
import { Layout, Row, Col } from "antd";
import "./AppFooter.css";

const { Footer } = Layout;
export const AppFooter = ({ ...props }) => {
  return (
    <div className="AppFooter">
      <Footer style={{ textAlign: "center" }}>
        <Row>
          <Col xs={24} sm={24} md={12} lg={24} xl={24} flex="auto"></Col>
        </Row>
        <Row>
          <Col xs={24} sm={24} md={12} lg={24} xl={24} flex="none">
            <span className="copyright">Copyright © 2023</span>
          </Col>
        </Row>
      </Footer>
    </div>
  );
};
