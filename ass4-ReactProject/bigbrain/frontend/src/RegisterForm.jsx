import React, { useState } from 'react';
import { Button, Form, Input, Space, Typography, Alert } from 'antd';
import fetchAPI from './components/APIcall';
import { useNavigate } from 'react-router-dom';

const { Link } = Typography;

export default function RegisterForm ({ setToken }) {
  const [alertMessage, setAllertMessage] = useState('')
  const onClose = (e) => {
    setAllertMessage('');
  };
  const navigate = useNavigate();
  // after user click submit button, register form inputs values are stored in 'values'
  const onFinish = async (values) => {
    const data = await fetchAPI('/admin/auth/register', 'POST', values);
    if (data.error) {
      setAllertMessage(data.error);
    } else {
      // go to dashboard page if register is succeed
      localStorage.setItem('token', data.token)
      setToken(data.token)
      navigate('/dashboard')
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };
  return (
    <>
      {/* show allert message if alertMessage is set */}
      {alertMessage === ''
        ? <></>
        : <Alert
      message="Login failed:"
      description={alertMessage}
      type="error"
      closable
      onClose={onClose}
      />}

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
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      {/* name field */}
      <Form.Item
        label="Name"
        name="name"
        rules={[
          {
            required: true,
            message: 'Please input your name!',
          },
        ]}
      >
        <Input name='userName'/>
      </Form.Item>

      {/* email field */}
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
        <Input name='userEmail'/>
      </Form.Item>

      {/* password field */}
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
        <Input.Password name='userPassword'/>
      </Form.Item>

      {/* submit button and login link */}
      <Form.Item {...tailLayout}>
        <Space size={65}>
          <Button type="primary" htmlType="submit" name='registerSubmitButton'>
            Submit
          </Button>
          <Link underline href="/">
            Login here
          </Link>
        </Space>
      </Form.Item>
    </Form>
    </>
  )
}
