import React from "react";
import { Table, Column, HeaderCell, Cell } from "rsuite-table";
import HeaderBar from "../components/HeaderBar";
import styled from "styled-components";
import BasicTable from "../components/Table";

const EditedTable = () => {
  return (
    <EditedPageContainer>
<<<<<<< Updated upstream
      <HeaderBar/>
      <BasicTable/>
=======
    <HeaderBar/>
      <Table>
        <Column width={100} sort fixed resizable>
          <HeaderCell>Week</HeaderCell>
          <Cell dataKey="week" />
        </Column>
        <Column width={100} sort resizable>
          <HeaderCell>Topic</HeaderCell>
          <Cell dataKey="topic" />
        </Column>
        <Column width={100} sort resizable>
          <HeaderCell>Description</HeaderCell>
          <Cell dataKey="description" />
        </Column>
      </Table>
>>>>>>> Stashed changes
    </EditedPageContainer>
  );
};

export default EditedTable;

const EditedPageContainer = styled.div`
    display: block;
`;
