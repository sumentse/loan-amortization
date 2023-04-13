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

const Table = ({ dataId, columns, rows, rowsPerPageOptions, disablePagination, tableContainerStyles }) => {

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions?.[0] || 5);

  const start = page * rowsPerPage;
  const end = start + rowsPerPage;
  const paginatedRows = rows?.slice(start, end);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCellRender = ({ value, formatter }) => {
    if (formatter) {
      return formatter(value);
    }
    return value;
  };

  const handleRowRender = () => {
    if (disablePagination) {
      return rows.map((row, index) => {
        return (
          <StyledTableRow key={index}>
            {columns.map((column) => {
              return (
                <TableCell key={`${index}-${column.field}`}>
                  {handleCellRender({
                    value: row?.[column?.field],
                    formatter: column?.valueFormatter,
                  })}
                </TableCell>
              );
            })}
          </StyledTableRow>
        );
      });
    }
    return paginatedRows.map((row, index) => (
      <StyledTableRow key={index}>
        {columns.map((column) => {
          return (
            <TableCell key={`${index}-${column.field}`}>
              {handleCellRender({
                value: row?.[column?.field],
                formatter: column?.valueFormatter,
              })}
            </TableCell>
          );
        })}
      </StyledTableRow>
    ));
  };

  return (
    <>
      <TableContainer data-id={dataId} component={Paper} sx={{ maxHeight: 400, ...tableContainerStyles }}>
        <MaterialTable
          aria-label="custom-table"
          sx={{ borderCollapse: "unset" }}
        >
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={`${column.field}-header`}
                  sx={{
                    borderBottom: "solid black 1px",
                    position: "sticky",
                    bgcolor: "white",
                    zIndex: 1,
                    top: 0,
                  }}
                >
                  {column.headerName}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody style={{ overflow: "auto", height: "100" }}>
            {handleRowRender()}
          </TableBody>
        </MaterialTable>
      </TableContainer>
      {!disablePagination && (
        <TablePagination
          rowsPerPageOptions={rowsPerPageOptions || [5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
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
