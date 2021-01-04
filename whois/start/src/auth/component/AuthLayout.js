import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Col, Row, Typography, Form, Input, Button, Checkbox } from "antd";

/**
 * 
 * @param {object} param
 * @param {() => void} param.onFinish
 * @param {import('react').ReactNode} param.children
 */
const AuthLayout = ({ children, onFinish }) => {
  return (
    <>
    <Row justify="center" style={{ marginTop: 100 }}>
        <Col>
          <Typography.Title style={{ fontFamily: "Caligrahhy" }}>
            찾 아 야 한 다
          </Typography.Title>
        </Col>
      </Row>
      <Row justify="center">
        <Col>
          <Form
            initialValues={{ remember: true }}
            style={{ width: 300, marginTop: 50 }}
            onFinish={onFinish}
          >
            {children}
          </Form>
        </Col>
      </Row>
    </>
  )
}
export default AuthLayout;