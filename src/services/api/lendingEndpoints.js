import { get, post, put } from "./base";

const userEndpoints = {
  list: () => get(`/users`),
  create: (username) => post(`/users`, { username }),
  listLoans: (userID) => get(`/users/${userID}/loans`),
};

const loanEndpoints = {
  create: (loanData) => post(`/loans`, loanData),
  getSchedule: (loanID, userID) => get(`/loans/${loanID}?user_id=${userID}`),
  update: (loanID, loanData) => put(`/loans/${loanID}`, loanData),
  getSummary: (loanID, month) => get(`/loans/${loanID}/month/${month}`),
  share: (loanID, ownerID, userID) =>
    post(`/loans/${loanID}/share?owner_id=${ownerID}&user_id=${userID}`),
};

const lendingEndpoints = {
  users: userEndpoints,
  loans: loanEndpoints,
};

export default lendingEndpoints;
