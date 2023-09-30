import { Button, Form } from 'antd';
import React from 'react';

// create a form with a list of form items to get user inputs
export default function createForm (onFinish, onFinishFailed, formItems) {
  return (
    // form style
    <Form
      name="basic"
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      {/* for each form item, show item name, and input type, if message is provided make this fied required */}
      {formItems.map((item) => {
        return (
        <Form.Item
          key={item.name}
          label={item.lable}
          name={item.name}
          rules={item.message
            ? [
                {
                  required: true,
                  message: item.message,
                },
              ]
            : []}
        >
          {item.input}
        </Form.Item>)
      })}
      {/* form item style */}
      <Form.Item
        wrapperCol={{
          offset: 11,
          span: 16,
        }}
      >
        {/* form submit button */}
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>

    </Form>)
}
