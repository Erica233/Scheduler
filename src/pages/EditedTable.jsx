import React from "react";
import { Table, Column, HeaderCell, Cell } from 'rsuite-table';


const EditedTable = () => {
 return(
<Table>
    <Column  width={100} sort fixed resizable>
        <HeaderCell>Week</HeaderCell>
        <Cell dataKey="week" />
    </Column>
    <Column  width={100} sort resizable>
        <HeaderCell>Topic</HeaderCell>
        <Cell dataKey="topic" />
    </Column>
    <Column  width={100} sort resizable>
        <HeaderCell>Description</HeaderCell>
        <Cell dataKey="description" />
    </Column>
</Table>
 );
}

export default EditedTable;