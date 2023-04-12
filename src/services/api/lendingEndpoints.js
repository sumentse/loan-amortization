import { get, post, put } from "./base";

const userEndpoints = {
  list: () => get(`/users`),
  create: (username) => post(`/users`, { username }),
  listLoans: (userID) => get(`/users/${userID}/loans`),
};

const loanEndpoints = {
  create: (loanData) => post(`/loans`, loanData),
  getSchedule: (loanID) => get(`/loans/${loanID}`),
  update: (loanID, loanData) => put(`/loans/${loanID}`, loanData),
  getSummary: (loanID, month) => get(`/loans/${loanID}/month/${month}`),
  share: (loanID) => post(`/loans/${loanID}/share`),
};

const lendingEndpoints = {
  users: userEndpoints,
  loans: loanEndpoints,
};

export default lendingEndpoints;
