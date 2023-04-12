import { useMutation } from "@tanstack/react-query";
import lendingEndpoints from "@services/api/lendingEndpoints";

const shareLoan = (loanId) => async () => {
  const response = await lendingEndpoints.loans.share(loanId);
  return response.data;
};

const useMutationShareLoan = () => {
  return useMutation(shareLoan, {
    onSuccess: () => {
      // Add any success logic here
    },
    onError: (error) => {
      // Add any error handling logic here
    },
  });
};

export default useMutationShareLoan;
