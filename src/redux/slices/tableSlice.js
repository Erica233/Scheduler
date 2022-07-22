import { createSlice } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";

const originData = [
  [1, "Tuesday 8/26", ""],
  [1, "Thursday 8/31", ""],
  [2, "Tuesday 9/2", ""],
  [2, "Thursday 9/7", ""],
  [3, "Tuesday 9/9", ""],
  [3, "Thursday 9/14", ""],
  [4, "Tuesday 9/16", ""],
  [4, "Thursday 9/21", ""],
  [5, "Tuesday 9/23", ""],
  [5, "Thursday 9/28", ""],
  [6, "Tuesday 9/30", ""],
  [6, "Thursday 10/5", "NO CLASS"],
];

const transformData = originData.map((arr) => {
  return {
    key: 0,
    week: `${arr[0]}`,
    date: `${arr[1]}`,
    topic: arr[2],
    description: ``,
  };
});

const init_columns = [
  {
    title: "week",
    dataIndex: "week",
    width: "10%",
    editable: false,
  },
  {
    title: "date",
    dataIndex: "date",
    width: "25%",
    editable: false,
  },
  {
    title: "topic",
    dataIndex: "topic",
    width: "20%",
    editable: true,
  },
  {
    title: "description",
    dataIndex: "description",
    width: "20%",
    editable: true,
  },
];

const initialState = {
  data: transformData,
  columns: init_columns,
};

export const tableSlice = createSlice({
  name: "table_info",
  initialState,
  reducers: {
    addColumn: (state) => {
      state = state.columns.push({
        title: "homework",
        dataIndex: "homework",
        width: "20%",
        editable: true,
      });
    },

    addRow: (state) => {},

    deleteColumn: (state) => {
      state = state.columns.pop();
    },

    deleteRow: (state) => {},
    resetState: (state) =>{
      console.log("clean");
      state = undefined;
    }
  },
});

export const { addColumn, addRow, deleteColumn, deleteRow, resetState } =
  tableSlice.actions;

export default tableSlice.reducer;
