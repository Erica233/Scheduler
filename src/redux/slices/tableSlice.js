import { createSlice } from "@reduxjs/toolkit";

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

const transformData = originData.map((arr, index) => {
  return {
    key: index,
    week: `${arr[0]}`,
    date: `${arr[1]}`,
    topic: arr[2],
    description: ``,
  };
});

const init_columns = [
  {
    title: "Week",
    dataIndex: "week",
    width: "10%",
    editable: false,
  },
  {
    title: "Date",
    dataIndex: "date",
    width: "25%",
    editable: false,
  },
  {
    title: "Topic",
    dataIndex: "topic",
    width: "20%",
    editable: true,
  },
  {
    title: "Description",
    dataIndex: "description",
    width: "20%",
    editable: true,
  },
];

const initialState = {
  data: [],
  columns: init_columns,
  table_name: "",
};

export const tableSlice = createSlice({
  name: "table_info",
  initialState,
  reducers: {
    addColumn: (state, action) => {
      state = state.columns.push({
        title: action.payload.column_name,
        dataIndex: action.payload.column_name,
        width: "25%",
      });
    },

    addRow: (state) => {},

    deleteColumn: (state, action) => {
      state.columns = state.columns.filter(column => column.title != action.payload);
    },

    deleteRow: (state, action) => {
      const key = action.payload.key;
      console.log(key);
      state.data = state.data.filter((item) => item.key !== key);
    },

    resetState: (state) => {
      state.columns = initialState.columns;
      state.data = initialState.data;
      state.table_name = initialState.table_name;
      sessionStorage.removeItem("persist:root");
    },

    setData: (state, action) => {
      console.log(action.payload);
      const originData = action.payload;
      const transformData = originData.map((arr, index) => {
        return {
          key: index,
          week: `${arr[0]}`,
          date: `${arr[1]}`,
          topic: arr[2],
          description: ``,
        };
      });
      state.data = transformData;
      state.columns = initialState.columns;
    },

    setTableName:(state, action) =>{
      state.table_name = action.payload;
    },
  },
});

export const {
  addColumn,
  addRow,
  deleteColumn,
  deleteRow,
  resetState,
  setData,
  setTableName,
} = tableSlice.actions;

export default tableSlice.reducer;
