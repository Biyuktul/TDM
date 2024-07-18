import React, { useState } from 'react';
import {
  Button,
  Form,
  Input,
  Select,
} from 'antd';
const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 9,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 18,
    },
  },
};
const UserAdd = (props) => {
  const [form] = Form.useForm();
  const [data, setData] = useState(null);
  const onSave = async (values) => {
    setData(values);
    console.log('Form Data: ', values);

    try {
      const response = await fetch('https://localhost:7087/api/Users/adduser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Success:', result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
  <Form
    {...formItemLayout}
    form={form}
    variant="filled"
    onFinish={onSave}
    style={{
      maxWidth: 600,
    }}
  >
    <Form.Item
      label="Full Name"
      name="fullName"
      rules={[
        {
          required: true,
          message: 'required',
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      label="Email"
      name="email"
      rules={[
        {
          required: true,
          message: 'required',
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      label="Phone Number"
      name="phoneNumber"
      rules={[
        {
          required: true,
          message: 'required',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Branch"
      name="branch"
      rules={[
        {
          required: false,
          message: 'required',
        },
      ]}
    >
      <Select>
          <Option value="Bole">Bole</Option>
          <Option value="Hawassa">Hawassa</Option>
          <Option value="Head Office">Head Office</Option>
      </Select>
    </Form.Item>

    <Form.Item
      label="Department"
      name="department"
      rules={[
        {
          required: false,
          message: 'required',
        },
      ]}
    >
      <Select>
          <Option value="Service Desk">Service Desk</Option>
          <Option value="Application and Support">Application and Support</Option>
          <Option value="Teller">Teller</Option>
      </Select>
    </Form.Item>

    <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
    <Form.Item
      wrapperCol={{
        offset: 6,
        span: 16,
      }}
    >
      <Button type="primary" htmlType="submit">
        Add
      </Button>
    </Form.Item>

    <Form.Item
      wrapperCol={{
        offset: 6,
        span: 16,
      }}
    >
      <Button onClick={props.hide}>
        Close
      </Button>
    </Form.Item>
    </div>
  </Form>
  );
}
export default UserAdd;