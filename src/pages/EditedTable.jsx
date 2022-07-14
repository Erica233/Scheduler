import React from "react";
import { Table, Column, HeaderCell, Cell } from "rsuite-table";
import HeaderBar from "../components/HeaderBar";
import styled from "styled-components";
import BasicTable from "../components/Table";

const EditedTable = () => {
  return (
    <EditedPageContainer>
      <HeaderBar/>
      <BasicTable/>
    </EditedPageContainer>
  );
};

export default EditedTable;

const EditedPageContainer = styled.div`
    display: block;
`;
