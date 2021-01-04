import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Form, Input, Button } from "antd";
import { Link } from "react-router-dom";
import AuthLayout from "../component/AuthLayout";

const Login = () => {
  return (
    <>
      <AuthLayout onFinish={() => {}}>
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input autoFocus prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            Log in
          </Button>
          Or <Link to="/signup">register now!</Link>
        </Form.Item>
      </AuthLayout>
    </>
  );
}

export default Login;