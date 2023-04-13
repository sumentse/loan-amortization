import { Table, LoadingScreen } from "@components";
import { useParams } from "react-router-dom";
import { Box, Typography, Alert } from "@mui/material";
import useQueryGetLoanSchedule from "@hooks/queries/useQueryGetLoanSchedule";

const columns = [
  { headerName: "Month", field: "month" },
  {
    headerName: "Open Balance",
    field: "open_balance",
    valueFormatter: (value) => value.toFixed(2),
  },
  {
    headerName: "Total Payment",
    field: "total_payment",
    valueFormatter: (value) => value.toFixed(2),
  },
  {
    headerName: "Principal Payment",
    field: "principal_payment",
    valueFormatter: (value) => value.toFixed(2),
  },
  {
    headerName: "Interest Payment",
    field: "interest_payment",
    valueFormatter: (value) => value.toFixed(2),
  },
  {
    headerName: "Close Balance",
    field: "close_balance",
    valueFormatter: (value) => value.toFixed(2),
  },
];

const LoanSchedule = () => {
  const { userID, loanID } = useParams() || {};
  const { data, isLoading, isError } = useQueryGetLoanSchedule({
    userID: +userID,
    loanID: +loanID,
  });

  if (isLoading) return <LoadingScreen />;
  if (isError) return <Alert severity="error">Something went wrong</Alert>;
  return (
    <Box sx={{ my: 10 }}>
      <Typography variant="h3" component="h1" sx={{ mb: 2 }}>
        Loan Schedule
      </Typography>
      <Table
        dataId="loan-schedule"
        tableContainerStyles={{ maxHeight: 900 }}
        columns={columns}
        rows={data}
        disablePagination
      />
    </Box>
  );
};

export default LoanSchedule;
