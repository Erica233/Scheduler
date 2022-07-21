import React, { useState } from 'react';
import 'antd/dist/antd.min.css';
// import './index.css';
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from 'antd';
import { toBeInTheDocument } from '@testing-library/jest-dom/dist/matchers';

const originData = [
  [1, 'Tuesday 8/26', ""],
  [1, 'Thursday 8/31', ""],
  [2, 'Tuesday 9/2', ""],
  [2, 'Thursday 9/7', ""],
  [3, 'Tuesday 9/9', ""],
  [3, 'Thursday 9/14', ""],
  [4, 'Tuesday 9/16', ""],
  [4, 'Thursday 9/21', ""],
  [5, 'Tuesday 9/23', ""],
  [5, 'Thursday 9/28', ""],
  [6, 'Tuesday 9/30', ""],
  [6, 'Thursday 10/5', "NO CLASS"],
];

const tableData = originData.map( arr => {
    return {key: 0, week: `${arr[0]}`, date: `${arr[1]}`, topic: arr[2], description: ``,};
  });

// add index to data
tableData.forEach((row, index) => {row.key = index});


console.log(tableData);

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

const BasicTable = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState(tableData);
  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      week: '',
      date: '',
      topic: '',
      description: '',
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
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

  const columns = [
    {
      title: 'week',
      dataIndex: 'week',
      width: '10%',
      editable: false,
    },
    {
      title: 'date',
      dataIndex: 'date',
      width: '25%',
      editable: false,
      // sorter: (a, b) => {
      //   //将日期转成毫秒数，有利于计算大小
      //     let atime=new Date(a.Date.replace(/-/g,'/')).getTime();
      //     let btime=new Date(b.Date.replace(/-/g,'/')).getTime();
      //     return atime - btime
      //   },
      //   //两个排序方向
      //   sortDirections: ['descend', 'ascend'],
      //   //默认排序
      //   defaultSortOrder: 'descend',
    },
    {
      title: 'topic',
      dataIndex: 'topic',
      width: '20%',
      editable: true,
    },
    {
      title: 'description',
      dataIndex: 'description',
      width: '20%',
      editable: true,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
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
        inputType: col.dataIndex === 'week' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
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
  );
};

export default BasicTable;

/**
 * TODO
 * 1. add row
 *   - add new row
 *   - add with week and date -> insert into correct position
 * 2. add column
 * 3. pesist store for refresh
 * 4. responsive view -> the table cover the Nav bar
 * 5. edit row
 *    - sort into correct position
 * 6. delete row
 * 7. delete column
 */

/**
 * 1. map backend data from array to object
 * 2. make week and date uneditable
 */