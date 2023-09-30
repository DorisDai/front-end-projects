import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Space } from 'antd';
import fetchAPI from './APIcall';
// create a nav bar, set log out button and dashboard button as default
export default function Nav ({ setToken }) {
  const navigate = useNavigate();
  return (
      <Space wrap>
        <Button type="primary" name="logOutButton" onClick={() => {
          fetchAPI('/admin/auth/logout', 'POST')
          localStorage.removeItem('token')
          setToken(null)
          navigate('/')
        }}>Log out</Button>

        <Button onClick={() => navigate('/dashboard')}>Dashboard</Button>
      </Space>
  )
}
