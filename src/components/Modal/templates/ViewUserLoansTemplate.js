import Table from "@components/Table";

const columns = [
  { headerName: "loanID", field: "id" },
  { headerName: "ownerID", field: "owner_id" },
  { headerName: "amount", field: "amount" },
  { headerName: "apr", field: "apr" },
  { headerName: "status", field: "status" },
  { headerName: "term", field: "term" },
];
const ViewUserLoansTemplate = ({ userLoans = [] }) => {
  return <Table columns={columns} rows={userLoans} />;
};

export default ViewUserLoansTemplate;
