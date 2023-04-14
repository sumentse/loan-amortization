import Table from "@components/Table";
import LoadingScreen from "@components/LoadingScreen";
import { Alert, IconButton, Box } from "@mui/material";
import AnalyticsIcon from "@mui/icons-material/Analytics";

const columns = [
  { headerName: "Loan ID", field: "id" },
  { headerName: "Owner ID", field: "owner_id" },
  { headerName: "Amount", field: "amount" },
  { headerName: "Apr", field: "apr" },
  { headerName: "Status", field: "status" },
  { headerName: "Term", field: "term" },
  { headerName: "View Schedule", field: "action" },
]

const ViewUserLoansTemplate = ({
  userLoans = [],
  isLoading = false,
  isError = false,
}) => {
  if (isLoading) {
    return <LoadingScreen styles={{ height: "100%" }} />;
  }
  if (isError) {
    return (
      <Alert severity="error">Something went wrong. Please try again.</Alert>
    );
  }

  const handleViewSchedule = ({ loanID, userID }) => {
    window.open(`/loan-schedule/user/${userID}/loan/${loanID}`, "blank");
  };

  const userLoansWithActions = userLoans.map((userLoan) => {
    return {
      ...userLoan,
      action: (
        <IconButton
          onClick={() =>
            handleViewSchedule({
              userID: userLoan.owner_id,
              loanID: userLoan.id,
            })
          }
        >
          <AnalyticsIcon color="primary" />
        </IconButton>
      ),
    };
  });

  return (
    <Box>
      <Table columns={columns} rows={userLoansWithActions} tableContainerStyles={{maxHeight: 329}} />
    </Box>
  );
};

export default ViewUserLoansTemplate;
