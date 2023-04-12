const lendingQueryKeys = {
  all: ["loans"],
  listUsers: () => [...loans.all, "users"],
  getUserLoans: (userId) => [...loans.listUsers(), userId, "loans"],
  getLoanDetails: (loanId) => [...loans.all, loanId],
  getLoanByMonth: (loanId, month) => [...loans.getLoanDetails(loanId), "month", month],
};

export default lendingQueryKeys;
