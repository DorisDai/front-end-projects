import React, { useState } from 'react';
import { Button, Form, Input, Space, Typography, Alert, Layout } from 'antd';
import fetchAPI from './components/APIcall';
import { useNavigate } from 'react-router-dom';
const { Content } = Layout;
// Login page shows a login form to get user inputs
const LoginForm = ({ setToken }) => {
  const { Link } = Typography;
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };

  const [alertMessage, setAllertMessage] = useState('')
  const navigate = useNavigate();
  // when user submit the form, user inputs are stored in values
  const onFinish = async (values) => {
    const data = await fetchAPI('/admin/auth/login', 'POST', values);
    if (data.error) {
      setAllertMessage(data.error);
    } else {
      // login succeed, go to dashboard page
      localStorage.setItem('token', data.token)
      setToken(data.token)
      navigate('/dashboard')
    }
  };

  const onClose = (e) => {
    setAllertMessage('');
  };

  return (
  <>
    {/* show alert message if alertMessage is not set to '' */}
    {alertMessage === ''
      ? <></>
      : <Alert
      message="Login failed:"
      description={alertMessage}
      type="error"
      closable
      onClose={onClose}
      />}
    <Layout>
      <Content style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh', // This will take up the full viewport height
      }}>
        <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 500,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        autoComplete="off"
        >
          {/* Email field */}
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your email address!',
              },
            ]}
          >
            <Input name="loginEmail"/>
          </Form.Item>

          {/* Password field */}
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password name="loginPassword"/>
          </Form.Item>

          {/* Submit button and register link */}
          <Form.Item {...tailLayout}>
            <Space size={65}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Link underline href="/register" data-cy="registerLink">
                Register here
              </Link>
            </Space>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  </>
  );
};
export default LoginForm;
