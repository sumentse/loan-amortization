import { useMutation } from "@tanstack/react-query";
import lendingEndpoints from "@services/api/lendingEndpoints";

const shareLoan = async (params) => {
  const { loanID, ownerID, userID } = params || {};
  const response = await lendingEndpoints.loans.share(loanID, ownerID, userID);
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
