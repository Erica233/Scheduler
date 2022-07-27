import { createSlice } from "@reduxjs/toolkit";

const init_columns = [
  {
    title: "Week",
    dataIndex: "Week",
    width: "10%",
    editable: false,
  },
  {
    title: "Date",
    dataIndex: "Date",
    width: "20%",
    editable: false,
  },
  {
    title: "Topic",
    dataIndex: "Topic",
    width: "20%",
    editable: true,
  },
  {
    title: "Description",
    dataIndex: "Description",
    width: "20%",
    editable: true,
  },
];

const initialState = {
  data: [],
  columns: init_columns,
  table_name: "",
  selected_year: "",
  start_week: 1,
};

const getTimeStamp = (data, year) => {
  //Tuesday 9/9
  if (typeof data === "string") {
    data = data.split(" ");
    let date = data[1].split("/");
    let month = date[0].length === 1 ? "0" + date[0] : date[0];
    let day = date[1];
    let timestamp = new Date(year, month - 1, day);
    return timestamp.getTime() / 100000;
  } else {
    return "";
  }
};

export const tableSlice = createSlice({
  name: "table_info",
  initialState,
  reducers: {
    addColumn: (state, action) => {
      const col_name = `${action.payload.column_name}`;
      state.columns.push({
        title: col_name,
        dataIndex: col_name,
        width: "20%",
        editable: true,
      });

      const obj = {};
      obj[col_name] = "";
      state.data.map((data) => {
        Object.assign(data, obj);
        return data;
      });
    },

    addRow: (state, action) => {
      let input_date = action.payload.date;
      input_date = input_date.split("-");
      let date_obj = new Date(input_date[0], input_date[1] - 1, input_date[2]);
      // get timestamp and week of new data
      let timestamp = date_obj.getTime() / 100000;
      const week = action.payload.week;

      // convert date from 1999-00-00 to Tuesday 00/00
      let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      let day = days[date_obj.getDay()];
      let month = date_obj.getMonth() + 1;
      let date = day + " " + month + "/" + date_obj.getDate();

      // construct new data object
      const columns = state.columns.map((col) => {
        return [col.title, ""];
      });
      let new_data = Object.fromEntries(columns);

      // set the week ,date and timestamp of new data
      // note: the week and date should be capital case
      // aligned with dataIndex in intial_columns
      new_data.Week = week;
      new_data.Date = date;
      new_data["timestamp"] = timestamp;
      state.data.push({ ...new_data, key: state.data.length });
      // sort table data based on timestamp value
      state.data.sort(
        (a, b) => parseFloat(a.timestamp) - parseFloat(b.timestamp)
      );
    },

    deleteColumn: (state, action) => {
      state.columns = state.columns.filter(
        (column) => column.title !== action.payload
      );
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
          Week: `${arr[0]}`,
          Date: `${arr[1]}`,
          Topic: arr[2],
          Description: ``,
          timestamp: getTimeStamp(arr[1], state.selected_year),
        };
      });
      state.data = transformData;
      state.columns = initialState.columns;
    },

    setTableName: (state, action) => {
      state.table_name = action.payload;
    },

    setSelectedYear: (state, action) => {
      state.selected_year = action.payload;
    },

    setEditedRow: (state, action) => {
      const index = state.data.findIndex(
        (obj) => obj.key === action.payload.key
      );
      state.data[index] = action.payload;
    },

    setFromImport: (state, action) => {
      console.log(action.payload.data);
      const originData = action.payload.data;
      const transformData = originData.map((arr, index) => {
        return {
          key: index,
          Week: `${arr[0]}`,
          Date: `${arr[1]}`,
          Topic: arr[2],
          Description: ``,
          timestamp: getTimeStamp(arr[1], state.selected_year),
        };
      });
      // console.log(action.payload.data);
      state.data = transformData;

      const originColumn = action.payload.columns;
      const transformColumn = originColumn.map((arr) => {
        return {
          title: arr,
          dataIndex: arr,
          width: "20%",
          editable: arr==="Week"||arr==="week"||arr==="Date"||arr==="date" ? true : false,
        };
      });
      console.log(action.payload.columns);
      state.columns = transformColumn;
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
  setSelectedYear,
  setEditedRow,
  setFromImport,
} = tableSlice.actions;

export default tableSlice.reducer;
