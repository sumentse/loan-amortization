import PropTypes from "prop-types";
import { useState } from "react";
import {
  Paper,
  Table as MaterialTable,
  TableHead,
  TableContainer,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Table = ({ columns, rows, rowsPerPageOptions }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions?.[0] || 5);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const start = page * rowsPerPage;
  const end = start + rowsPerPage;
  const paginatedRows = rows?.slice(start, end);

  return (
    <>
      <TableContainer component={Paper}>
        <MaterialTable aria-label="custom-table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={`${column.field}-header`}>
                  {column.headerName}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.map((row) => (
              <StyledTableRow key={row.id}>
                {columns.map((column) => {
                  return (
                    <TableCell key={`${row.id}-${column.field}`}>
                      {row?.[column?.field] || ""}
                    </TableCell>
                  );
                })}
              </StyledTableRow>
            ))}
          </TableBody>
        </MaterialTable>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions || [5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

Table.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      headerName: PropTypes.string.isRequired,
      field: PropTypes.string,
    })
  ).isRequired,
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number),
};

export default Table;
