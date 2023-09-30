import { InputNumber } from 'antd';
import React from 'react';
export default function LongInputNumber (props) {
  return (
    <InputNumber
      style={{
        width: 200,
      }}
      {...props}
    />
  )
}
