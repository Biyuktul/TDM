import React, { useEffect, useState } from 'react';
import { Button, Form, Input, InputNumber, Popconfirm, Table, Typography, Popover  } from 'antd';
import UserAdd from './UserAdd';

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
const UserList2 = () => {
  const [form] = Form.useForm();
  const [count, setCount] = useState(2);
  const [data, setData] = useState();
  const [open, setOpen] = useState(false);

  const hide = () => {
    setOpen(false);
  };
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };
  const fetche_data = () =>{
    fetch('weatherforecast')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json();
  })
  .then(data => {
    const dataWithKeys = data.map((item, index) => ({
      ...item,
      key: item.id || index
    }));
    setData(dataWithKeys);
  })
  .catch(error => {
    console.error('There has been a problem with your fetch operation:', error);
  });

  }

  useEffect(fetche_data, []);


  const [editingKey, setEditingKey] = useState('');
  const isEditing = (record) => record.key === editingKey;
  const edit = (record) => {
    form.setFieldsValue({
      name: '',
      phone: '',
      address: '',
      branch: '',
      department: '',
      ...record,
    });
    setEditingKey(record.key);
  };
  const cancel = () => {
    setEditingKey('');
  };
  
  const save = async (key) => {
    //send put request to the server
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const handleDelete = (key) => {
    //send a delete request to the server to delete
    const newData = data.filter((item) => item.key !== key);
    setData(newData);
  };
  
  const handleAdd = () => {
    // fetch data from the form and set the state variable
    const newData = {
        key: '4',
        name: 'Leul Kas',
        phone: '0944332277',
        address: 'leul.kahsaye@berhanbanksc.com',
        branch: 'Head Office',
        department: 'Service Desk',
    };
    setData([...data, newData]);
    setCount(count + 1);
  };

  const columns = [
  {
    title: 'Name',
    dataIndex: 'fullName',
    // width: '25%',
    editable: true,
  },
  {
    title: 'Phone Number',
    dataIndex: 'phoneNumber',
    width: '15%',
    editable: true,
  },
  {
    title: 'Email address',
    dataIndex: 'email',
    width: '15%',
    editable: true,
  },
  {
    title: 'Branch',
    dataIndex: 'branch',
    width: '15%',
    editable: true,
  },
  {
    title: 'Department',
    dataIndex: 'department',
    width: '15%',
    editable: true,
  },
  {
    title: 'operation',
    dataIndex: 'operation',
    width: '5%',
    render: (_, record) =>
        data.length >= 1 ? (
        <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
            <a>Delete</a>
        </Popconfirm>
        ) : null,
  },
  {
    title: 'operation',
    dataIndex: 'operation',
    width: '5%',
    render: (_, record) => {
    const editable = isEditing(record);
    return editable ? (
        <span>
        <Typography.Link
            onClick={() => save(record.key)}
            style={{
            marginRight: 8,
            }}
        >
            Save
        </Typography.Link>
        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
            <a>Cancel</a>
        </Popconfirm>
        </span>
    ) : (
        <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
        Edit
        </Typography.Link>
    );
    },
  },
  ];


  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <>
    <Popover
      content=  {<UserAdd hide={hide}/>}
      title="Add User Information"
      trigger="click"
      open={open}
      onOpenChange={handleOpenChange}
    >
      <Button type="primary" style={{marginTop: '30px', marginBottom: '20px'}} > Add User </Button>
      
    </Popover>
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
        
      />
    </Form>
    </>
  );
};
export default UserList2;