const lendingQueryKeys = {
  all: ["loans"],
  listUsers: () => [...lendingQueryKeys.all, "users"],
  getUserLoans: (userId) => [...lendingQueryKeys.listUsers(), userId, "loans"],
  getLoanDetails: (loanId) => [...lendingQueryKeys.all, loanId],
  getLoanByMonth: (loanId, month) => [...lendingQueryKeys.getLoanDetails(loanId), "month", month],
};

export default lendingQueryKeys;
