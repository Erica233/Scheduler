import React from "react";
import { Table, Column, HeaderCell, Cell } from "rsuite-table";
import HeaderBar from "../components/HeaderBar";
import styled from "styled-components";
import BasicTable from "../components/Table";

const EditedTable = () => {
  return (
    <div className="edit">
      <HeaderBar/>
      <BasicTable/>
    </div>
  );
};

export default EditedTable;
