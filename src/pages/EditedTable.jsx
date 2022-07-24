import React from "react";
import { Table, Column, HeaderCell, Cell } from "rsuite-table";
import HeaderBar from "../components/HeaderBar";
import styled from "styled-components";
import BasicTable from "../components/Table";
import { useSelector } from "react-redux";


const EditedTable = () => {
  const table_name = useSelector((state) => state.table_name);
  return (
    <div className="edit">
      <HeaderBar/>
      <h1>{table_name}</h1>
      <BasicTable/>
    </div>
  );
};

export default EditedTable;
