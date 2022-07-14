import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData(1, '01/01 MON', 'N/A', 'N/A', 'N/A'),
  createData(2, '01/08 MON', 'N/A', 'N/A', 'N/A'),
  createData(3, '01/15 MON', 'N/A', 'N/A', 'N/A'),
  createData(4, '01/22 MON', 'N/A', 'N/A', 'N/A'),
  createData(5, '01/29 MON', 'N/A', 'N/A', 'N/A'),
];

export default function BasicTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Week</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Topic</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Other</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
