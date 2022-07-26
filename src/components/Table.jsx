import React, { useState } from "react";
import "antd/dist/antd.min.css";
import { Form, Input, InputNumber, Table, Popconfirm, Typography } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { addColumn, setData, deleteRow } from "../redux/slices/tableSlice";

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
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
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
  // const [data, setData] = useState(tableData);
  const [editingKey, setEditingKey] = useState("");
  const dispatch = useDispatch();
  let data = useSelector((state) => state.data);
  console.log(data);
  data = data.map(({ timestamp, ...res }) => ({ ...res }));
  

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    console.log(record);
    form.setFieldsValue({
      week: "",
      date: "",
      topic: "",
      description: "",
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        dispatch(setData(newData));
        setEditingKey("");
      } else {
        newData.push(row);
        dispatch(setData(newData));
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  // get columns state from redux store
  const columns_state = useSelector((state) => state.columns);

  const columns = [
    ...columns_state,
    {
      title: "Operation",
      dataIndex: "operation",
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
          <div>
            <Typography.Link
              disabled={editingKey !== ""}
              onClick={() => edit(record)}
            >
              Edit
            </Typography.Link>
            <br />
            <Typography.Link
              disabled={editingKey !== ""}
              onClick={() => dispatch(deleteRow(record))}
            >
              Delete
            </Typography.Link>
          </div>
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
        inputType: col.dataIndex === "week" ? "number" : "text",
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
