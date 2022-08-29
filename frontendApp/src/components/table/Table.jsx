import React, { useState, useEffect } from "react";
import "antd/dist/antd.min.css";
import {
  Form,
  Input,
  InputNumber,
  Table,
  Popconfirm,
  Typography,
  Button,
  Row,
  Col,
  Tooltip,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteRow,
  setEditedRow,
  setColumns,
} from "../../redux/slices/tableSlice";
import NewRowForm from "./NewRowForm";
import { Resizable } from "react-resizable"; // make column resiable
import Popup from "./Popup";
import ColumnForm from "./ColumnForm";
import { arrayMoveImmutable } from "array-move";
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from "react-sortable-hoc";
import Icon from "@mui/material/Icon";

import "../../App.css";

const ResizableTitle = (props) => {
  const { onResize, width, ...restProps } = props;

  console.log(`resize: ${width}`);

  if (!width) {
    return <th {...restProps} />;
  }

  return (
    <Resizable
      width={parseInt(width)}
      height={0}
      handle={
        <span
          className="react-resizable-handle"
          onClick={(e) => {
            e.stopPropagation();
          }}
        />
      }
      onResize={onResize}
      draggableOpts={{
        enableUserSelectHack: false,
      }}
    >
      <th {...restProps} />
    </Resizable>
  );
};

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
              required: false,
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
  // fetch data state from redux storage
  let data = useSelector((state) => state.data);
  data = data.map(({ timestamp, ...res }) => ({ ...res }));

  const isEditing = (record) => record.key === editingKey;

  // state for add row & column popup
  const [addRowPopup, setAddRowPopup] = useState(false);
  const [addColumnPopupBefore, setAddColumnPopupBefore] = useState(false);
  const [addColumnPopupBehind, setAddColumnPopupBehind] = useState(false);
  const [addColumnPopup, setAddColumnPopup] = useState(false);
  const [currColName, setCurrColName] = useState("false");

  // edit operation
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

  // cancel operation
  const cancel = () => {
    setEditingKey("");
  };

  // save operation
  const save = async (key) => {
    try {
      const edited_data = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const edited_row = newData[index];
        for (const [key, value] of Object.entries(edited_data)) {
          edited_row[key] = value;
        }
        dispatch(setEditedRow(edited_row));
        setEditingKey("");
      } else {
        // newData.push(edited_data);
        // dispatch(setEditedRow(newData));
        console.log("index less than -1");
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  // get columns state from redux storage
  const columns_state = useSelector((state) => state.columns);

  // add "opertation" column to the end of table column
  let columns = [
    ...columns_state,
    {
      title: "Operation",
      dataIndex: "Operation",
      width: "150",
      align: "center",
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
            <Typography.Link onClick={cancel}>
              <a>Cancel</a>
            </Typography.Link>
          </span>
        ) : (
          <Row gutter={6}>
            <Col>
              <Typography.Link
                disabled={editingKey !== ""}
                onClick={() => edit(record)}
              >
                <Tooltip title="edit row">
                  <Button shape="circle">
                    <EditOutlined />
                  </Button>
                </Tooltip>
              </Typography.Link>
            </Col>

            <Col>
              <Typography.Link
                disabled={editingKey !== ""}
                onClick={() => dispatch(deleteRow(record))}
              >
                <Tooltip title="delete row">
                  <Button shape="circle">
                    <DeleteOutlined />
                  </Button>
                </Tooltip>
              </Typography.Link>
            </Col>
          </Row>
        );
      },
    },
  ];

  columns = columns.map((col) => ({
    ...col,
    title: (
      // <span style={{justifyContent: "space-between"}}>
    <div>
    {// we can add icon to add a new column before this column
        /* <Icon
          color="primary"
          fontSize="small"
          onClick={() => {
            setAddColumnPopupBefore(true);
            setAddColumnPopup(addColumnPopupBefore || addColumnPopupBehind);
            setCurrColName(col.title);
          }}
          style={{left: "0"}}
        >
          add_circle
        </Icon> */}
        {col.title}
        <br/>
        <Tooltip placement="bottom" title="add column after">
        {col.title !== "Operation" ? <Icon
          color="primary"
          fontSize="small"
          onClick={() => {
            setAddColumnPopupBehind(true);
            setAddColumnPopup(true);
            setCurrColName(col.title);
          }}
        >
          add_circle
        </Icon> : ""}
        </Tooltip>
        </div>
      // </span>
    ),
  }));

  console.log(columns);

  const handleResize =
    (index) =>
    (_, { size }) => {
      const newColumns = [...columns];
      newColumns[index] = { ...newColumns[index], width: size.width };
      setColumns(newColumns);
    };

  const mergedColumns = columns.map((col, index) => {
    if (!col.editable) {
      return {
        ...col,
        onHeaderCell: (column) => ({
          width: column.width,
          onResize: handleResize(index),
        }),
      };
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

      onHeaderCell: (column) => ({
        width: column.width,
        onResize: handleResize(index),
      }),
    };
  });

  const SortableItem = SortableElement((props) => <tr {...props} />);
  const SortableBody = SortableContainer((props) => <tbody {...props} />);

  const onSortEnd = ({ oldIndex, newIndex }) => {
    if (oldIndex !== newIndex) {
      const newData = arrayMoveImmutable(
        data.slice(),
        oldIndex,
        newIndex
      ).filter((el) => !!el);
      console.log("Sorted items: ", newData);
      setColumns(newData);
    }
  };

  const DraggableContainer = (props) => (
    <SortableBody
      useDragHandle
      disableAutoscroll
      helperClass="row-dragging"
      onSortEnd={onSortEnd}
      {...props}
    />
  );

  const DraggableBodyColumn = ({ className, style, ...restProps }) => {
    // function findIndex base on Table rowKey props and should always be a right array index
    const index = columns.findIndex(
      (x) => x.dataIndex === restProps["col-key"]
    );
    return <SortableItem index={index} {...restProps} />;
  };

  return (
    <div>
      <Popup trigger={addRowPopup} setTrigger={setAddRowPopup}>
        <NewRowForm />
      </Popup>

      <ColumnForm
        trigger={addColumnPopup}
        setTrigger={setAddColumnPopup}
        curr_col_name={currColName}
        pos={addColumnPopupBefore === true ? "before" : "befind"}
        resetBefore={setAddColumnPopupBefore}
        resetBehind={setAddColumnPopupBehind}
      />

      <Form form={form} component={false}>
        <Table
          components={{
            header: {
              // cell: ResizableTitle,
              wrapper: DraggableContainer,
              row: DraggableBodyColumn,
            },
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"
          // pagination={{
          //   onChange: cancel,
          // }}
          pagination={false}
          // style={{ boxShadow: "10px 10px 5px #888" }}
          scroll={{
            x: 100,
          }}
        />
      </Form>
    </div>
  );
};

export default BasicTable;
